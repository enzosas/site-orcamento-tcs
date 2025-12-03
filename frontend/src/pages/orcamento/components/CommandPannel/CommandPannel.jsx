import "./CommandPannel.css"
import { useState, useEffect } from "react";
import { fixConfig, getOpcoesPotencia, getOpcoesControle } from "../../../../utils/regrasConfig.js"


function CommandPannel({ talha, config, setConfig }) {
    if (!talha) return null;

    const opcoesPotencia = getOpcoesPotencia(config.painel6Mov);
    const opcoesControle = getOpcoesControle(config.controleRemoto, config.painel6Mov);

    const atualizarConfig = (alteracoesParciais) => {
        setConfig((prevConfig) => {
            const configProvisoria = { ...prevConfig, ...alteracoesParciais };
            return fixConfig(configProvisoria, talha);;
        });
    };

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
                        onChange={(e) => atualizarConfig({excluirPainel: e.target.checked })}
                    />
                    Sem Painel de Comando
                </label>

                {/* Dependentes */}
                <label className={`${config.excluirPainel || talha.duplaVelocidadeElevacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={config.excluirPainel || talha.duplaVelocidadeElevacaoInversor === false}
                        checked={config.duplaVelocidadeElevacao}
                        onChange={(e) => atualizarConfig({duplaVelocidadeElevacao: e.target.checked })}
                    />
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>

                <label className={`${config.excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={config.excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false}
                        checked={config.duplaVelocidadeTranslacao}
                        onChange={(e) => atualizarConfig({duplaVelocidadeTranslacao: e.target.checked })}
                    />
                    Dupla Velocidade de Translação com inversor de frequência
                </label>

                <label className={`${config.excluirPainel || talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.painel6Mov}
                        disabled={config.excluirPainel || talha.painelParaPonteRolante === false}
                        onChange={(e) => atualizarConfig({painel6Mov: e.target.checked })}
                    />
                    Painel 6 Movimentos com 2 velocidades
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${config.excluirPainel || !config.painel6Mov ? "disabled" : ""}`}>Potência Motores Cabeceiras</h4>
                    <select
                        name="opcoesPotencia"
                        disabled={config.excluirPainel || !config.painel6Mov}
                        value={config.potenciaMotores}
                        onChange={(e) => atualizarConfig({potenciaMotores: e.target.value })}
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
                        onChange={(e) => atualizarConfig({controleRemoto: e.target.checked })}
                    />
                    Controle Remoto 1 transmissor + 1 Receptor
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${config.excluirPainel || !config.controleRemoto ? "disabled" : ""}`}>Modelo do Controle</h4>
                    <select
                        name="opcoesControle"
                        disabled={config.excluirPainel || !config.controleRemoto}
                        value={config.modeloControle}
                        onChange={(e) => atualizarConfig({modeloControle: e.target.value })}
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
                        onChange={(e) => atualizarConfig({transmissorExtra: e.target.checked })}
                    />
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;
