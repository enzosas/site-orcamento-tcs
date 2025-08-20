import "./CommandPannel.css"
import { useState, useEffect } from "react";

function CommandPannel({ talha }) {
    if (!talha) return null;

    const [incluirPainel, setIncluirPainel] = useState(false);

    useEffect(() => {
        if (talha.painelParaPonteRolante === false) {
            setIncluirPainel(false);
        }
    }, [talha.painelParaPonteRolante]);

    let opcoesPotencia = [
        "2 x 0,25 kW","2 x 0,37 kW","2 x 0,55 kW","2 x 0,75 kW","2 x 1,1 kW",
        "2 x 1,5 kW","2 x 2,2 kW","2 x 3,0 kW","2 x 3,7 kW","2 x 4,5 kW","2 x 5,5 kW"
    ];

    let opcoesControle = ["BCI 404", "BCI 808"];

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>

            <div className="frame-caixas-selecao">
                {/* Caixa principal: pode estar desabilitada, mas nunca marcada enquanto desabilitada */}
                <label className={`${talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={incluirPainel}
                        disabled={talha.painelParaPonteRolante === false}
                        onChange={(e) => setIncluirPainel(e.target.checked)}
                    />
                    Incluir Painel de Comando
                </label>

                {/* Dependentes */}

                <label className={`${!incluirPainel || talha.duplaVelocidadeElevacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={!incluirPainel || talha.duplaVelocidadeElevacaoInversor === false}
                    />
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>

                <label className={`${!incluirPainel || talha.duplaVelocidadeTranslacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={!incluirPainel || talha.duplaVelocidadeTranslacaoInversor === false}
                    />
                    Dupla Velocidade de Translação com inversor de frequência
                </label>

                <label className={`${!incluirPainel || talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        disabled={!incluirPainel || talha.painelParaPonteRolante === false}
                    />
                    Painel 6 Movimentos com 2 velocidades
                </label>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${!incluirPainel ? "disabled" : ""}`}>Potência Motores Cabeceiras</h4>
                    <select name="opcoesPotencia" disabled={!incluirPainel}>
                        {opcoesPotencia.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className={`headerSelect ${!incluirPainel ? "disabled" : ""}`}>Modelo do Controle</h4>
                    <select name="opcoesControle" disabled={!incluirPainel}>
                        {opcoesControle.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <label className={`${!incluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input type="checkbox" disabled={!incluirPainel} />
                    Controle Remoto 1 transmissor + 1 Receptor
                </label>

                <label className={`${!incluirPainel ? "checkbox-item-disabled" : ""}`}>
                    <input type="checkbox" disabled={!incluirPainel} />
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;
