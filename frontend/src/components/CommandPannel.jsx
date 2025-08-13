import "./CommandPannel.css"

function CommandPannel(){
    return (
        <div>
            <div className="frame-checkbox-painel">
                <input type="checkbox"></input>
                <label >Painel de Comando</label>
            </div>
            <div className="frame-branco">
                <h1>Painel de Comando</h1>
                <hr></hr>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <label class="checkbox-item disabled">
                    <input type="checkbox" disabled></input>
                    Dupla Velocidade de Elevação com inversor de frequência
                </label>
            </div>
        </div>
    )
}

export default CommandPannel;