import { TemplateHandler } from 'easy-template-x';
import { saveAs } from 'file-saver';
import templatePath from '../assets/templateOrcamento.docx?url';
import { formatarTalhaExibicao, formatarConfigExibicao, getDadosExibicao } from '../utils/dadosExibicao';

const formatadorPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const gerarDocx = async (talha, config, cliente, precos, arquivo = null) => {
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
        const safeCliente = cliente || {};

        const dados = {
            cepCidadeUF: `${safeCliente.cep || ''} - ${safeCliente.cidade || ''}/${safeCliente.estado || ''}`,
            correnteOuCabo: talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo",
            preco: formatadorPreco.format(precos.totalTcs || 0),
            data: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
            imagemTalha: imagemObjeto || "",
            ...safeCliente,
            ...talhaFormatada,
            ...configFormatada,
            ...dadosTalha
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(templateBlob, dados);

        const blobFinal = new Blob([doc], { 
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        });

        saveAs(blobFinal, `Orcamento_${safeCliente.razaoSocial || 'Cliente'}.docx`);

    } catch (error) {
        console.error(error);
        alert("Erro ao gerar documento: " + error.message);
    }
};