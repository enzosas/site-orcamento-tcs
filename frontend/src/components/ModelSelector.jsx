import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function ModelSelector(){
    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title"> Escolha o modelo </h2>
            < ModelSelectorList />
            <hr></hr>
            <h2 className="frame-branco-title"> Filtros </h2>
            < ModelSelectorFilter />

        </div>
    )
}

export default ModelSelector;