import "./CommandPannel.css"
import { useState, useEffect } from "react";
import { fixConfig, getOpcoesPotencia, getOpcoesControle } from "../../../../utils/regrasConfig.js"


function CommandPannel({ talha, config, setConfig }) {
    if (!talha) return null;

    const opcoesPotencia = getOpcoesPotencia(config.painel6Mov);
    const opcoesControle = getOpcoesControle(config.controleRemoto, config.painel6Mov);

    const atualizarConfig = (alteracoesParciais) => {
        if (alteracoesParciais.painel6Mov === false) {
            alteracoesParciais.incluirSinalizadores = false;
        }
        setConfig((prevConfig) => {
            const configProvisoria = { ...prevConfig, ...alteracoesParciais };
            return fixConfig(configProvisoria, talha);;
        });
    };

    const regrasDesabilitar = {
        excluirPainel: !talha.exclusaoPainelComandoForca,
        duplaVelocidadeElevacao: config.excluirPainel || !talha.duplaVelocidadeElevacaoInversor,
        duplaVelocidadeTranslacao: config.excluirPainel || !talha.duplaVelocidadeTranslacaoInversor,
        painel6Mov: config.excluirPainel || !talha.painelParaPonteRolante,
        potenciaMotores: config.excluirPainel || !config.painel6Mov,
        controleRemoto: config.excluirPainel || !talha.controleRemotoDisponivel,
        modeloControle: config.excluirPainel || !config.controleRemoto,
        transmissorExtra: config.excluirPainel || !config.controleRemoto,
    }

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>

            <div className="frame-caixas-selecao">
                <label className={`${regrasDesabilitar.excluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.excluirPainel}
                        disabled={regrasDesabilitar.excluirPainel}
                        onChange={(e) => atualizarConfig({excluirPainel: e.target.checked })}
                    />
                    Sem Painel de Comando
                </label>

                <label className={`${regrasDesabilitar.duplaVelocidadeElevacao ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={regrasDesabilitar.duplaVelocidadeElevacao}
                        checked={config.duplaVelocidadeElevacao}
                        onChange={(e) => atualizarConfig({duplaVelocidadeElevacao: e.target.checked })}
                    />
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>

                <label className={`${regrasDesabilitar.duplaVelocidadeTranslacao ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={regrasDesabilitar.duplaVelocidadeTranslacao}
                        checked={config.duplaVelocidadeTranslacao}
                        onChange={(e) => atualizarConfig({duplaVelocidadeTranslacao: e.target.checked })}
                    />
                    Dupla Velocidade de Translação com inversor de frequência
                </label>

                <label className={`${regrasDesabilitar.painel6Mov ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.painel6Mov}
                        disabled={regrasDesabilitar.painel6Mov}
                        onChange={(e) => atualizarConfig({painel6Mov: e.target.checked })}
                    />
                    Painel 6 Movimentos com 2 velocidades
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${regrasDesabilitar.potenciaMotores ? "disabled" : ""}`}>Potência Motores Cabeceiras</h4>
                    <select
                        name="opcoesPotencia"
                        disabled={regrasDesabilitar.potenciaMotores}
                        value={config.potenciaMotores}
                        onChange={(e) => atualizarConfig({potenciaMotores: e.target.value })}
                    >
                        {opcoesPotencia.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${regrasDesabilitar.controleRemoto ? "checkbox-item-disabled" : ""}`}>
                    <input 
                        type="checkbox" 
                        disabled={regrasDesabilitar.controleRemoto}
                        checked={config.controleRemoto}
                        onChange={(e) => atualizarConfig({controleRemoto: e.target.checked })}
                    />
                    Controle Remoto 1 transmissor + 1 Receptor
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${regrasDesabilitar.modeloControle ? "disabled" : ""}`}>Modelo do Controle</h4>
                    <select
                        name="opcoesControle"
                        disabled={regrasDesabilitar.modeloControle}
                        value={config.modeloControle}
                        onChange={(e) => atualizarConfig({modeloControle: e.target.value })}
                    >
                        {opcoesControle.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${regrasDesabilitar.transmissorExtra ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={regrasDesabilitar.transmissorExtra}
                        checked={config.transmissorExtra}
                        onChange={(e) => atualizarConfig({transmissorExtra: e.target.checked })}
                    />
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;
