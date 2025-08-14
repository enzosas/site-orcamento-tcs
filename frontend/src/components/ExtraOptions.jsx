import "./CommandPannel.css"

function ExtraOptions(){
    return (
        <div>
            <div className="frame-checkbox-extra">
                <label >
                    <input type="checkbox"></input>
                    Fim de Curso de Cruzeta Esquerda/Direita
                </label>
                <label >
                    <input type="checkbox"></input>
                    Guia para o Cabo de Aço
                </label>
                <label >
                    <input type="checkbox"></input>
                    Célula de Carga
                </label>
                <label >
                    <input type="checkbox"></input>
                    Adaptador de Viga
                </label>
            </div>
        </div>
    )
}

export default ExtraOptions;