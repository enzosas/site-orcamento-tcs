import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function ModelSelector(){
    return (
        <div className="frame-branco">
            <h2 className="model-title"> Escolha o modelo </h2>
            < ModelSelectorList />
            <hr></hr>
            <h2 className="model-title"> Filtros </h2>
            < ModelSelectorFilter />

        </div>
    )
}

export default ModelSelector;