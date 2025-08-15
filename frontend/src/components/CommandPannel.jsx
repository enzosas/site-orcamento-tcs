import "./CommandPannel.css"

function CommandPannel(){
    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Painel de Comando</h2>
            <hr></hr>
            <div className="frame-caixas-selecao">
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <label class="checkbox-item-disabled">
                    <input type="checkbox" disabled></input>
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>
                <label class="checkbox-item-disabled">
                    <input type="checkbox" disabled></input>
                    Dupla Velocidade de Translação com inversor de frequência
                </label>
                <label class="checkbox-item-disabled">
                    <input type="checkbox" disabled></input>
                    Dupla Velocidade de Translação com inversor de frequência
                </label>
                <h2 className="titulo-cabeceira">Potência Motores Cabeceiras</h2>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <label class="checkbox-item-disabled">
                    <input type="checkbox" disabled></input>
                    Controle Remoto 1 transmissor + 1 Receptor
                </label><label class="checkbox-item-disabled">
                    <input type="checkbox" disabled></input>
                    Transmissor Extra para Controle Remoto
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;