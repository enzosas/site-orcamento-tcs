import "./TalhaWindow.css"

function TalhaWindow({ talha }){
    if (!talha) return null;
    return (
        <div className="frame-imagem">
            <img src={`/fotos/${talha.modelo}.jpg`}/>
        </div>
    )
}

export default TalhaWindow;
