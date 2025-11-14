import "./CommandPannel.css"
import { useState, useEffect } from "react";


function getOpcoesPotencia(isPainel6Mov) {
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

function getOpcoesControle(isControleRemoto, isPainel6Mov) {
    if (!isControleRemoto) {
        return [""]; // Opção vazia se o controle não estiver selecionado
    }
    if (isPainel6Mov) {
        return ["BCI 808"]; // 'painel6Mov' força "BCI 808"
    }
    return ["BCI 404", "BCI 808"]; // Padrão
}

function CommandPannel({ talha, config, setConfig }) {
    if (!talha) return null;
    
    const handleControleRemotoChange = (e) => {
        const isChecked = e.target.checked;
        const novasOpcoesControle = getOpcoesControle(isChecked, config.painel6Mov);
        const novoModeloControle = novasOpcoesControle[0] || "";

        setConfig(prev => ({
            ...prev,
            controleRemoto: isChecked,
            modeloControle: novoModeloControle,
            // Se 'isChecked' for falso, define 'transmissorExtra' como falso também
            ...(!isChecked && { transmissorExtra: false }) 
        }));
    };

    const handlePainel6MovChange = (e) => {
        const isChecked = e.target.checked;
        const novasOpcoesPotencia = getOpcoesPotencia(isChecked);
        const novaPotencia = novasOpcoesPotencia[0] || "";
        const novasOpcoesControle = getOpcoesControle(config.controleRemoto, isChecked);
        const novoModeloControle = novasOpcoesControle[0] || "";
        
        setConfig(prev => ({
            ...prev,
            painel6Mov: isChecked,
            potenciaMotores: novaPotencia,
            modeloControle: novoModeloControle,
            ...(isChecked && { incluirSinalizadores: true }) 
        }));
    };

    useEffect(() => {
		if (talha.duplaVelocidadeElevacaoInversor === false) {
			if (talha.acionamentoMotorElevacao === "2 velocidades com inversor"){
				setConfig(prev => ({ ...prev, duplaVelocidadeElevacao: true }));
			} else {
				setConfig(prev => ({ ...prev, duplaVelocidadeElevacao: false }));
			}        
		}
		if (talha.duplaVelocidadeTranslacaoInversor === false) {
			if (talha.acionamentoMotorElevacao === "2 velocidades com inversor"){
				setConfig(prev => ({ ...prev, duplaVelocidadeTranslacao: true }));
			} else {
				setConfig(prev => ({ ...prev, duplaVelocidadeTranslacao: false }));
			}        
		}
	}, [talha]);

	useEffect(() => {
		if (config.excluirPainel) {
        setConfig(prev => ({
            ...prev,
            painel6Mov: false,
            controleRemoto: false,
            transmissorExtra: false
            }));
        }
        
    }, [config.excluirPainel]);

    useEffect(() => {
        if (talha.exclusaoPainelComandoForca === false) {
            setConfig(prev => ({
                ...prev,
                excluirPainel: false,
            }))
        }
    }, [talha.exclusaoPainelComandoForca]);

    const opcoesPotencia = getOpcoesPotencia(config.painel6Mov);
    const opcoesControle = getOpcoesControle(config.controleRemoto, config.painel6Mov);

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>

            <div className="frame-caixas-selecao">
                {/* Caixa principal: Excluir Painel */}
                <label className={`${talha.exclusaoPainelComandoForca === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.excluirPainel}
                        disabled={talha.exclusaoPainelComandoForca === false}
                        onChange={(e) => setConfig(prev => ({ ...prev, excluirPainel: e.target.checked }))}
                    />
                    Sem Painel de Comando
                </label>

                {/* Dependentes */}
                <label className={`${config.excluirPainel || talha.duplaVelocidadeElevacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={config.excluirPainel || talha.duplaVelocidadeElevacaoInversor === false}
                        checked={config.duplaVelocidadeElevacao}
                        onChange={(e) => setConfig(prev => ({ ...prev, duplaVelocidadeElevacao: e.target.checked }))}
                    />
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>

                <label className={`${config.excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={config.excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false}
                        checked={config.duplaVelocidadeTranslacao}
                        onChange={(e) => setConfig(prev => ({ ...prev, duplaVelocidadeTranslacao: e.target.checked }))}
                    />
                    Dupla Velocidade de Translação com inversor de frequência
                </label>

                <label className={`${config.excluirPainel || talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.painel6Mov}
                        disabled={config.excluirPainel || talha.painelParaPonteRolante === false}
                        onChange={handlePainel6MovChange}
                    />
                    Painel 6 Movimentos com 2 velocidades
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${config.excluirPainel || !config.painel6Mov ? "disabled" : ""}`}>Potência Motores Cabeceiras</h4>
                    <select
                        name="opcoesPotencia"
                        disabled={config.excluirPainel || !config.painel6Mov}
                        value={config.potenciaMotores}
                        onChange={(e) => setConfig(prev => ({ ...prev, potenciaMotores: e.target.value }))}
                    >
                        {opcoesPotencia.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${config.excluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input 
                        type="checkbox" 
                        disabled={config.excluirPainel || talha.controleRemotoDisponivel === false}
                        checked={config.controleRemoto}
                        onChange={handleControleRemotoChange}
                    />
                    Controle Remoto 1 transmissor + 1 Receptor
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${config.excluirPainel || !config.controleRemoto ? "disabled" : ""}`}>Modelo do Controle</h4>
                    <select
                        name="opcoesControle"
                        disabled={config.excluirPainel || !config.controleRemoto}
                        value={config.modeloControle}
                        onChange={(e) => setConfig(prev => ({ ...prev, modeloControle: e.target.value }))}
                    >
                        {opcoesControle.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${config.excluirPainel || !config.controleRemoto ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={config.excluirPainel || !config.controleRemoto}
                        checked={config.transmissorExtra}
                        onChange={(e) => setConfig(prev => ({ ...prev, transmissorExtra: e.target.checked }))}
                    />
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;
