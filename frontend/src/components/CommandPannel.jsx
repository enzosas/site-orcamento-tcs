import "./CommandPannel.css"
import { useState, useEffect } from "react";

function CommandPannel({ talha }) {
    if (!talha) return null;

    const [excluirPainel, setExcluirPainel] = useState(false);
    const [painel6Mov, setPainel6Mov] = useState(false);

    useEffect(() => {
        if (talha.exclusaoPainelComandoForca === true) {
            setExcluirPainel(true);
        }
        else setExcluirPainel(false);
    }, [talha.exclusaoPainelComandoForca]);

    let opcoesPotencia = [
        "2 x 0,25 kW","2 x 0,37 kW","2 x 0,55 kW","2 x 0,75 kW","2 x 1,1 kW",
        "2 x 1,5 kW","2 x 2,2 kW","2 x 3,0 kW","2 x 3,7 kW","2 x 4,5 kW","2 x 5,5 kW"
    ];

    let opcoesControle = [];
    if (talha){
        if (painel6Mov)
        {
            opcoesControle = ["BCI 808"];
        } else {
            opcoesControle = ["BCI 404", "BCI 808"];
        }
            
    }

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>

            <div className="frame-caixas-selecao">
                {/* Caixa principal: Excluir Painel */}
                <label className={`${talha.exclusaoPainelComandoForca === true ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={excluirPainel}
                        disabled={talha.exclusaoPainelComandoForca === true}
                        onChange={(e) => setExcluirPainel(e.target.checked)}
                    />
                    Sem Painel de Comando
                </label>

                {/* Dependentes */}
                <label className={`${excluirPainel || talha.duplaVelocidadeElevacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={excluirPainel || talha.duplaVelocidadeElevacaoInversor === false}
                    />
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>

                <label className={`${excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={excluirPainel || talha.duplaVelocidadeTranslacaoInversor === false}
                    />
                    Dupla Velocidade de Translação com inversor de frequência
                </label>

                <label className={`${excluirPainel || talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={painel6Mov}
                        disabled={excluirPainel || talha.painelParaPonteRolante === false}
                        onChange={(e) => setPainel6Mov(e.target.checked)}
                    />
                    Painel 6 Movimentos com 2 velocidades
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${excluirPainel || !painel6Mov? "disabled" : ""}`}>Potência Motores Cabeceiras</h4>
                    <select name="opcoesPotencia" disabled={excluirPainel || !painel6Mov}>
                        {opcoesPotencia.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${excluirPainel ? "disabled" : ""}`}>Modelo do Controle</h4>
                    <select name="opcoesControle" disabled={excluirPainel}>
                        {opcoesControle.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${excluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input type="checkbox" disabled={excluirPainel} />
                    Controle Remoto 1 transmissor + 1 Receptor
                </label>

                <label className={`${excluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input type="checkbox" disabled={excluirPainel} />
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;
