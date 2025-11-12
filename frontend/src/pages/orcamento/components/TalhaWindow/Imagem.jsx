import "./TalhaWindow.css"

function TalhaWindow({ talha }){
    if (!talha) return null;
    const imagePath = `${import.meta.env.BASE_URL}fotos/${talha.modelo}.jpg`;
    return (
        <div className="frame-imagem">
            <img src={imagePath}/>
        </div>
    )
}

export default TalhaWindow;
