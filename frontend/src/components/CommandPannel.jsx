import "./CommandPannel.css"

function CommandPannel({ talha }){
    if (!talha) return null;

    let opcoesTensao = [];
    if (talha.tensaoTrifasica === "220/380V - Trifásica") {
        opcoesTensao = [
            "220V - Trifásica",
            "380V - Trifásica"
        ];
    } else {
        opcoesTensao = [talha.tensaoTrifasica];
    }

    let opcoesPotencia = [
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

    let opcoesControle = [
        "BCI 404",
        "BCI 808"
    ];

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>
            <hr></hr>
            
        
            <div className="frame-caixas-selecao">
                
                <div className="frame-unidade-caixa-selecao">
                    <h4 className="headerSelect">Tensão</h4>
                    <select name="opcoesTensao">
                        {opcoesTensao.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>
                
                <label class={`${talha.duplaVelocidadeElevacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input 
                        type="checkbox" 
                        disabled={talha.duplaVelocidadeElevacaoInversor === false} 
                    ></input>
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>
                
                <label class={`${talha.duplaVelocidadeTranslacaoInversor === false ? "checkbox-item-disabled" : ""}`}>
                    <input 
                        type="checkbox" 
                        disabled={talha.duplaVelocidadeTranslacaoInversor === false} 
                    ></input>
                    Dupla Velocidade de Translação com inversor de frequência
                </label>
                
                <label class={`${talha.painelParaPonteRolante === false ? "checkbox-item-disabled" : ""}`}>
                    <input 
                        type="checkbox" 
                        disabled={talha.painelParaPonteRolante === false} 
                    ></input>
                    Painel 6 Movimentos com 2 velocidades
                </label>
            
                <div className="frame-unidade-caixa-selecao">
                    <h4 className="headerSelect">Potência Motores Cabeceiras</h4>
                    <select name="opcoesPotencia">
                        {opcoesPotencia.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>

                <div className="frame-unidade-caixa-selecao">
                    <h4 className="headerSelect">Modelo do Controle</h4>
                    <select name="opcoesControle">
                        {opcoesControle.map((opcao, i) => (
                            <option key={i} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                </div>
            
                <label>
                    <input type="checkbox" ></input>
                    Controle Remoto 1 transmissor + 1 Receptor
                </label><label>
                    <input type="checkbox" ></input>
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;