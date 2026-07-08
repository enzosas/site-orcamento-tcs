import { TemplateHandler } from 'easy-template-x';
import { saveAs } from 'file-saver';
import templateSemPontePath from '../assets/templateOrcamento.docx?url';
import templatePontePath from '../assets/templateOrcamentoPonte.docx?url';
import { formatarTalhaExibicao, formatarConfigExibicao, getDadosExibicao, formatarConfigPonteExibicao, formatarPontePrecosPesos, gerarDescricaoCaminhoRolamento } from '../utils/dadosExibicao';

const formatadorPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const gerarDocx = async (talha, config, cliente, precos, pagamento, arquivo = null, precosPesosPonte, ponteConfig) => {
    
    const incluiPonte = ponteConfig.incluir;
    const templatePath = incluiPonte ? templatePontePath : templateSemPontePath;

    try {
        let templateBlob;
        if (arquivo) {
            templateBlob = await arquivo.arrayBuffer();
        } else {
            const response = await fetch(templatePath);
            if (!response.ok) throw new Error('Erro ao carregar o arquivo template.docx');
            templateBlob = await response.arrayBuffer();
        }

        let imagemObjeto = null;
        try {
            const imgUrl = `${import.meta.env.BASE_URL}fotos/${talha.modelo}.jpg`;
            const responseImg = await fetch(imgUrl);
            
            if (responseImg.ok) {
                const imgBlob = await responseImg.blob();
                imagemObjeto = {
                    _type: "image",
                    source: imgBlob,
                    format: responseImg.headers.get('content-type') || "image/jpeg",
                    width: 200,
                    height: 200,
                    altText: talha.modelo
                };
            }
        } catch (e) {
            console.warn(e);
        }

        const talhaFormatada = formatarTalhaExibicao(talha);
        const configFormatada = formatarConfigExibicao(config);
        const dadosTalha = getDadosExibicao(talha, config);
        const configPonteFormatada = formatarConfigPonteExibicao(ponteConfig)
        const precosPesosPonteFormatada = formatarPontePrecosPesos(precosPesosPonte)

        const cepCidadeUF = `${cliente.cep || ''} - ${cliente.cidade || ''}/${cliente.estado || ''}`;
        const correnteOuCabo = talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo";
        const valorTotal = pagamento.orcamentoCalculado.precoTotal;
        const valorUnitario = pagamento.orcamentoCalculado.precoUnitario;
        const valorUnitarioTalhaFinal = pagamento.orcamentoCalculado.valorUnitarioTalhaFinal;
        const valorUnitarioPonteFinal = pagamento.orcamentoCalculado.valorUnitarioPonteFinal;
        const data = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
        const campoPonteEletrificacaoLongitudinal = configPonteFormatada.dadosBasicos_eletrificacaoLongitudinal + " - " + ponteConfig.dadosBasicos_comprimento + "m";

        const dados = {
            ...cliente,
            ...pagamento,
            ...talhaFormatada,
            ...configFormatada,
            ...dadosTalha,
            cepCidadeUF: cepCidadeUF,
            correnteOuCabo: correnteOuCabo,
            data: data,
            imagemTalha: imagemObjeto || "",
            precoUnitarioF: formatadorPreco.format(valorUnitario),
            precoTotalF: formatadorPreco.format(valorTotal),
            precoUnitarioTalha: formatadorPreco.format(valorUnitarioTalhaFinal),
            precoUnitarioPonte: formatadorPreco.format(valorUnitarioPonteFinal),
            ponteOuPortico: configPonteFormatada.dadosBasicos_isPonte,
            ponteCapacidade: configPonteFormatada.dadosBasicos_capacidade,
            ponteVaoLivre: configPonteFormatada.dadosBasicos_vaoLivre,
            ponteTipo: configPonteFormatada.dadosBasicos_formaConstrutiva,
            ponteCaminhoRolamento: gerarDescricaoCaminhoRolamento(ponteConfig),
            ponteEletrificacaoTransversal: configPonteFormatada.dadosBasicos_eletrificacaoTransversal,
            ponteEletrificacaoLongitudinal: campoPonteEletrificacaoLongitudinal,
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(templateBlob, dados);
        const blobFinal = new Blob([doc], { 
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        });
        saveAs(blobFinal, `Orcamento_${cliente.razaoSocial || 'Cliente'}.docx`);
    } catch (error) {
        console.error(error);
        alert("Erro ao gerar documento: " + error.message);
    }
};