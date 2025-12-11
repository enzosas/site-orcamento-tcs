export function getOpcoesPotencia(isPainel6Mov) {
    if (isPainel6Mov) {
        return [
            "2 x 0,25 kW", 
            "2 x 0,37 kW", 
            "2 x 0,55 kW", 
            "2 x 0,75 kW", 
            "2 x 1,1 kW",
            "2 x 1,5 kW", 
            "2 x 2,2 kW", 
            "2 x 3,0 kW", 
            "2 x 3,7 kW", 
            "2 x 4,5 kW", 
            "2 x 5,5 kW"
        ];
    }
    return [];
}

export function getOpcoesControle(isControleRemoto, isPainel6Mov) {
    if (!isControleRemoto) {
        return [""];
    }
    if (isPainel6Mov) {
        return ["BCI 808"];
    }
    return ["BCI 404", "BCI 808"];
}

export function getOpcoesTensao(talha) {
    if (talha) {
        if (talha.tensaoTrifasica === "220/380V - Trifásica") {
            return ["380V - Trifásica", "220V - Trifásica"];
        } else {
            return [talha.tensaoTrifasica];
        }
    }
}

export function fixConfig(configOld, talha) {

    let config = {...configOld};

    if (talha) {
        if (talha.duplaVelocidadeElevacaoInversor === false) {
            config.duplaVelocidadeElevacao = (talha.acionamentoMotorElevacao === "2 velocidades com inversor");
        }
        if (talha.duplaVelocidadeTranslacaoInversor  === false) {
            config.duplaVelocidadeTranslacao = (talha.acionamentoMotorTranslacao === "2 velocidades com inversor");
        }
        if (talha.celulaCargaDisponivel === false) {
            config.celulaCarga = false;
        }
        if (talha.fimCursoDireitaEsquerdaDisponivel === false) {
            config.fimCursoEsquerdaDireita = false;
        }
        if (talha.adaptadorVigaDisponivel === false) {
            config.adaptadorViga = false;
        }
        if (talha.guiaCabo === "Sim") {
            config.guiaCaboAco = true ;
        } else if (talha.guiaCabo === "Não") {
            config.guiaCaboAco = false ;
        }
        if (talha.tensao === "") {
            config.tensao = getOpcoesTensao(talha)[0];
        }
    }

    if (config.excluirPainel) {
        config.painel6Mov = false;
        config.controleRemoto = false;
        config.transmissorExtra = false;
        config.modeloControle = "";
        config.potenciaMotores = "";
        return config;
    }

    if (config.painel6Mov) {
        config.incluirSinalizadores = true;
        const opcoes = getOpcoesPotencia(true);
        if (!opcoes.includes(config.potenciaMotores)) {
            config.potenciaMotores = opcoes[0] || "";
        }
        if (config.controleRemoto) {
            config.modeloControle = "BCI 808"; 
        }
    } else {
        config.potenciaMotores = ""; 
    }

    if (config.controleRemoto) {
        const opcoes = getOpcoesControle(true, config.painel6Mov);
        if (!opcoes.includes(config.modeloControle)) {
            config.modeloControle = opcoes[0] || "";
        }
    } else {
        config.modeloControle = "";
        config.transmissorExtra = false;
    }
    return config;
}

