import "./ModelSelector.css"
import React, { useState, useEffect } from "react";


function ModelSelectorList({ modelos }) {
    const [selecionado, setSelecionado] = useState(0);

    return (
        <div className="selector-border">
            <div className="selector">
                {modelos.map((modelo, index) => (
                    <div
                    key={index}
                    className={`modelo-opcao ${selecionado === index ? "selecionado" : ""}`}
                    onClick={() => setSelecionado(index)}
                    >
                    {modelo}
                    </div>
                ))}
            </div>
        </div>
        );
}

export default ModelSelectorList;