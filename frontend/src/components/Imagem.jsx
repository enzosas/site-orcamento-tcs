import "./TalhaWindow.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function TalhaWindow({ talha }){
    if (!talha) return null;
    return (
        <div className="frame-imagem">
            <img src={`/fotos/${talha.modelo}.jpg`}/>
        </div>
    )
}

export default TalhaWindow;
