import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { RelatorioPDF } from '../../../../utils/orcamentoPDF';

const PDFViewerTela = ({ }) => {
    const dadosExemplo = {
        nome: "Maria Oliveira",
        email: "maria@teste.com",
        pedidoId: "98765"
    };

const talha = {
    modelo: "TCS060N06TF",
    capacidade: 6000,
    formaConstrutiva: "Normal",
    grupoTrabalho: "1 Am / M4",
    correnteCabo: "Cabo de Aço",
    cursoUtilGancho: 6,
    tipoTrole: "Trole Elétrico",
    tensaoTrifasica: "220/380V - Trifásica",
    motorElevacao: "7,5 kW",
    velElevacaoPadrao: "3,2",
    velElevacaoOpcional: "0,8 / 3,2",
    acionamentoMotorElevacao: "1 velocidade",
    motorTranslacao: "0,37 kW",
    velTranslacaoPadrao: "13,5",
    velTranslacaoOpcional: "4,0 / 16,0",
    larguraVigaPadrao: "100 - 178 mm",
    acionamentoMotorTranslacao: "1 velocidade",
    freioNoCarroTranslacao: true,
    celulaCargaSerie: false,
    guiaCabo: "Sim",
    fimCursoSobe: "Subida/Descida",
    botoeira: "4 mov. 1 vel. + Emergência",
    caboBotoeira: 6,
    ramais: 4,
    painelComandoPadrao: " 4 Movimentos",
    tensaoComando: "24 Vca",
    localArquivoImagem: "C:\\Users\\enzos\\OneDrive\\Documentos\\TCS\\FOTOS\\imagens transparente\\TCS060N06TF.JPG",
    peso: 491,
    duplaVelocidadeElevacaoInversor: true,
    duplaVelocidadeTranslacaoInversor: true,
    painelParaPonteRolante: true,
    celulaCargaDisponivel: true,
    controleRemotoDisponivel: true,
    fimCursoDireitaEsquerdaDisponivel: true,
    guiaCaboDisponivel: false,
    adaptadorVigaDisponivel: true,
    codigoPainelTalhaSemOpcional: "CIRC.BASE.TCS",
    resistorFrenagem: null,
    codigoPainel6Mov: "CIRC.PTE6080",
    exclusaoPainelComandoForca: true
};

const config = {
    talhaSelecionada: "TCS060N06TF",
    excluirPainel: false,
    painel6Mov: true,
    controleRemoto: true,
    duplaVelocidadeElevacao: true,
    duplaVelocidadeTranslacao: true,
    transmissorExtra: true,
    potenciaMotores: "2 x 0,25 kW",
    modeloControle: "BCI 808",
    tensao: "380V - Trifásica",
    incluirSinalizadores: true,
    fimCursoEsquerdaDireita: true,
    guiaCaboAco: false,
    celulaCarga: true,
    adaptadorViga: true
};

const cliente = {
    cnpj: "01767833000145",
    razaoSocial: "TCS INDÚSTRIA METALÚRGICA LTDA",
    inscricaoEstadual: "1090230114",
    cep: "97110691",
    logradouro: "Rua Júlio Colpo do Amaral",
    enderecoNumero: "270",
    complemento: "",
    bairro: "Pé de Plátano",
    cidade: "Santa Maria",
    estado: "RS",
    telefone: "(55) 3222 4474",
    endereco: "Rua Júlio Colpo do Amaral, 270",
    pessoaContato: "enzo",
    email: "enzo.silveira@acad.ufsm.br",
    whatsapp: "(54) 98112-0386"
};

const precos = {
    totalSch: 73065.73433,
    totalTcs: 64288.04233,
    circuitoSch: 30700.50471,
    circuitoTcs: 21922.81271,
    adaptadorViga: 1070.12,
    talhaSemCircuito: 42365.22962
};

    return (
        <div className='pdf'>
            <div className='frame'>
                <PDFViewer width="99.8%" height="99.8%">
                    <RelatorioPDF dados={dadosExemplo} />
                </PDFViewer>
                <button onClick={() => onClose()}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default PDFViewerTela;