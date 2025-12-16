const boolParaTexto = (valor) => valor ? "Sim" : "Não";

const medida = (valor, unidade) => (valor !== null) ? `${valor} ${unidade}` : ""; 

export function formatarTalhaExibicao(talha) {
    return {
        ...talha,
        capacidade: medida(talha.capacidade, "kg"),
        cursoUtilGancho: medida(talha.cursoUtilGancho, "metros"),
        velElevacaoPadrao: medida(talha.velElevacaoPadrao, "m/min"),
        freioNoCarroTranslacao: boolParaTexto(talha.freioNoCarroTranslacao),
        fimCursoEsquerdaDireita: boolParaTexto(talha.fimCursoEsquerdaDireita),
        peso: medida(talha.peso, "kg")
    };
}

export function formatarConfigExibicao(config) {
    return {
        ...config,
        fimCursoEsquerdaDireita: boolParaTexto(config.fimCursoEsquerdaDireita),
        guiaCaboAco: boolParaTexto(config.guiaCaboAco),
        celulaCarga: boolParaTexto(config.celulaCarga),
    }
}

export function getDadosExibicao(talha, config) {
    
    let dados = {
        painelComandoTipo: talha.painelComandoPadrao,
        tensaoTrabalho: config.tensao,
        tensaoComando: talha.tensaoComando,
        sobeDesce: config.duplaVelocidadeElevacao? "2 velocidades com inversor" : talha.acionamentoMotorElevacao,
        direitaEsquerda: config.duplaVelocidadeTranslacao? "2 velocidades com inversor" : talha.acionamentoMotorTranslacao,
        frenteTras: config.painel6Mov ? "2 movimentos" : "Não",
        potenciaMotorPonte: config.painel6Mov ? config.potenciaMotores : "",
        botoeira: talha.botoeira,
        controleRemoto: config.controleRemoto ? config.modeloControle : "Não",
        transmissorExtra: boolParaTexto(config.transmissorExtra),
        sinalizadores: boolParaTexto(config.incluirSinalizadores),
        tomadaTrocaRapida: boolParaTexto(!config.excluirPainel),

    };
    if (config.excluirPainel) {
        dados.painelComandoTipo = "Sem painel de comando";
        dados.tensaoTrabalho = "";
        dados.tensaoComando = "";
        dados.sobeDesce = "";
        dados.direitaEsquerda = "";
        dados.frenteTras = "";
        dados.botoeira = "";
        dados.transmissorExtra = "";
        dados.controleRemoto = "";
        dados.sinalizadores = "";
        dados.tomadaTrocaRapida = "";
    }
    return dados;
}