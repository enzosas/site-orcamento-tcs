const boolParaTexto = (valor) => valor ? "Sim" : "Não";

const medida = (valor, unidade, casasDecimais = 2) =>
    (valor !== null && valor !== undefined && valor !== '')
        ? `${parseFloat(valor).toFixed(casasDecimais).replace('.', ',')} ${unidade}`
        : "";

const limpaNull = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null || obj[key] === undefined) {
            obj[key] = "";
        }
    });
}

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export function formatarTalhaExibicao(talha) {

    const obj = {
        ...talha,
        capacidade: medida(talha.capacidade, "kg"),
        cursoUtilGancho: medida(talha.cursoUtilGancho, "metros"),
        velElevacaoPadrao: medida(talha.velElevacaoPadrao, "m/min"),
        freioNoCarroTranslacao: boolParaTexto(talha.freioNoCarroTranslacao),
        fimCursoEsquerdaDireita: boolParaTexto(talha.fimCursoEsquerdaDireita),
        peso: medida(talha.peso, "kg")
    };
    limpaNull(obj);
    return obj;
}

export function formatarConfigExibicao(config) {
    const obj = {
        ...config,
        fimCursoEsquerdaDireita: boolParaTexto(config.fimCursoEsquerdaDireita),
        guiaCaboAco: boolParaTexto(config.guiaCaboAco),
        celulaCarga: boolParaTexto(config.celulaCarga),
    }
    limpaNull(obj);
    return obj;
}

export function formatarConfigPonteExibicao(configPonte) {
    const obj = {
        ...configPonte,
        dadosBasicos_capacidade: medida(configPonte.dadosBasicos_capacidade, "kg"),
        dadosBasicos_vaoLivre: medida(configPonte.dadosBasicos_vaoLivre, "mm", 0),
        dadosBasicos_isPonte: configPonte.dadosBasicos_isPonte ? "Ponte Rolante" : "Pórtico Rolante",
        dadosBasicos_comprimento: medida(configPonte.dadosBasicos_comprimento, "m")
    }
    limpaNull(obj);
    return obj;
}

export function formatarPontePrecosPesos(precosPesos) {
    const obj = {
        ...precosPesos,
        cargaMaximaRoda: medida(precosPesos.cargaMaximaRoda, "kg"),
        pesoViga: medida(precosPesos.pesoViga, "kg"),
        pesoParCabeceira: medida(precosPesos.pesoParCabeceira, "kg"),
        pesoEletrificacaoTransversal: medida(precosPesos.pesoEletrificacaoTransversal, "kg"),
        pesoEletrificacaoLongitudinal: medida(precosPesos.pesoEletrificacaoLongitudinal, "kg"),
        pesoCaminhoRolamento: medida(precosPesos.pesoCaminhoRolamento, "kg"),
        pesoColunasApoio: medida(precosPesos.pesoColunasApoio, "kg"),
        pesoTotal: medida(precosPesos.pesoTotal, "kg"),
        precoVigaPrincipal: formatadorPreco.format(precosPesos.precoVigaPrincipal),
        precoCabeceiras: formatadorPreco.format(precosPesos.precoCabeceiras),
        precoMontagem: formatadorPreco.format(precosPesos.precoMontagem),
        precoEletrificacaoTransversal: formatadorPreco.format(precosPesos.precoEletrificacaoTransversal),
        precoEletrificacaoLongitudinal: formatadorPreco.format(precosPesos.precoEletrificacaoLongitudinal),
        precoCaminhoRolamento: formatadorPreco.format(precosPesos.precoCaminhoRolamento),
        precoColunasApoio: formatadorPreco.format(precosPesos.precoColunasApoio),
        precoTotal: formatadorPreco.format(precosPesos.precoTotal),
    }
    limpaNull(obj);
    return obj;
}

export function getDadosExibicao(talha, config) {

    let dados = {
        painelComandoTipo: talha.painelComandoPadrao,
        tensaoTrabalho: config.tensao,
        tensaoComando: talha.tensaoComando,
        sobeDesce: config.duplaVelocidadeElevacao ? "2 velocidades com inversor" : talha.acionamentoMotorElevacao,
        direitaEsquerda: config.duplaVelocidadeTranslacao ? "2 velocidades com inversor" : talha.acionamentoMotorTranslacao,
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
    limpaNull(dados);
    return dados;
}

export function gerarDescricaoCaminhoRolamento(configPonte) {
    
    const semCaminhoRolamento = !configPonte.dadosBasicos_isCaminhoRolamento;
    if (semCaminhoRolamento) {
        return "Opcional";
    }
    const isSomenteTrilho = configPonte.caminhoRolamento_tipo == "Somente Trilho";
    const isTrilhoChumbador = configPonte.caminhoRolamento_tipo == "Trilho + Chumbador";
    
    if (isSomenteTrilho) {
        return "Em trilho TR ou similar com comprimento total de 2x " + comp +"m a ser fixado em chumbadores metálicos presentes no leito de concreto já existente no local"
    }
    if (isTrilhoChumbador) {
        return "Trilho + Chumbador";
    }

    const configPonteFormatada = formatarConfigPonteExibicao(configPonte)
    const comp = configPonte.dadosBasicos_comprimento;
    const distanciasApoioIguais = configPonte.caminhoRolamento_ladoA_distanciaApoios == configPonte.caminhoRolamento_ladoB_distanciaApoios;
    const numeroColunasIguais = configPonte.colunasSustentacao_ladoA_numeroColunas == configPonte.colunasSustentacao_ladoA_numeroColunas;
    const isSemColunaA = configPonte.colunasSustentacao_ladoA_dimensoes == "Sem coluna";
    const isSemColunaB = configPonte.colunasSustentacao_ladoB_dimensoes == "Sem coluna";
    const distApoiosA = configPonte.caminhoRolamento_ladoA_distanciaApoios;
    const distApoiosB = configPonte.caminhoRolamento_ladoB_distanciaApoios;

    if (distanciasApoioIguais && isSemColunaA && isSemColunaB) {
        return "Em perfil metálico com comprimento total de " + comp + " metros, apoiado a cada " + distApoiosA + " metros sobre consoles (com placa metalica de apoio) já existentes no local"
    }
    else if (!distanciasApoioIguais && isSemColunaA && isSemColunaB) {
        return "Em perfil metálico com comprimento total de " + comp + " metros, apoiado em um dos lados a cada " + distApoiosA + " metros e no outro lado a cada " + distApoiosB + " metros sobre consoles (com placa metalica de apoio) já existentes no local em ambos os lados"
    }
    else if (numeroColunasIguais && !isSemColunaA && !isSemColunaB) {
        return "Em perfil metálico com comprimento total de " + comp + " metros, apoiado a cada " + distApoiosA + " metros sobre colunas metalicas que serão fixadas as laterais e ao piso do prédio"
    }
    else if (!isSemColunaA && isSemColunaB) {
        return "Em perfil metálico com comprimento total de "+ comp +" metros, apoiado em um dos lados a cada "+ distApoiosA + " metros sobre colunas metálicas que serão fixadas ao piso e a laterais do prédio e no outro lado a cada "+ distApoiosB +" metros sobre consoles (com placa metalica de apoio)  já existentes no local"
    }
    else if (isSemColunaA && !isSemColunaB) {
        return "Em perfil metálico com comprimento total de "+ comp +" metros, apoiado em um dos lados a cada "+ distApoiosA+ " metros sobre consoles  (com placa metalica de apoio)  já existentes no local  e no outro lado a cada "+ distApoiosB +" metros sobre colunas metálicas que serão fixadas ao piso e a lateral do prédio "
    }

}