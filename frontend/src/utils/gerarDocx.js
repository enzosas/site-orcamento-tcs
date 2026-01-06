import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import templatePath from '../assets/templateOrcamento.docx?url';
import expressions from 'angular-expressions';
import { formatarTalhaExibicao, formatarConfigExibicao, getDadosExibicao } from '../utils/dadosExibicao';

function angularParser(tag) {
    if (tag === '.') {
        return {
            get: function(s){ return s;}
        };
    }
    
    const expr = expressions.compile(
        tag.replace(/(’|“|”|‘)/g, "'")
    );

    return {
        get: function(scope, context) {
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;
            
            for (let i = 0, len = num + 1; i < len; i++) {
                obj = Object.assign(obj, scopeList[i]);
            }
            
            try {
                return expr(scope, obj);
            } catch (error) {
                return "";
            }
        }
    };
}

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const gerarDocx = async (talha, config, cliente, precos, arquivo=null) => {
  try {
    let content
    if (arquivo) {
        content = await arquivo.arrayBuffer();
    } else {
        const response = await fetch(templatePath);
        if (!response.ok) {
          throw new Error('Erro ao carregar template');
        }
        content = await response.arrayBuffer();
    }

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        parser: angularParser,
    });

    let dados = getDadosExibicao(talha, config);
    const talhaFormatada = formatarTalhaExibicao(talha);
    const configFormatada = formatarConfigExibicao(config);

    console.table(talhaFormatada)
    console.table(configFormatada)
    console.table(cliente)
    console.table(precos)
    console.table(dados)

    dados = {
        ...dados,
        cepCidadeUF: `${cliente.cep} - ${cliente.cidade}/${cliente.estado}`,
        correnteCabo: talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo",
        preco: formatadorPreco.format(precos.totalTcs),
    };

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    doc.render({
        talha: talhaFormatada,
        config: configFormatada,
        dados,
        cliente,
        data: dataAtual,
    });

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(out, `Orcamento_${cliente.razaoSocial || 'Cliente'}.docx`);

  } catch (error) {
    console.error(error);
  }
}