import "./ModelSelector.css"
import React, { useState, useEffect } from "react";


function ModelSelectorList({ modelos, onSelect }) {
    const [selecionado, setSelecionado] = useState(0);

    useEffect(() => {
        if (modelos.length > 0) {
            setSelecionado(0);
            onSelect(modelos[0]);
        }
    }, [modelos, onSelect]);

    return (
        <div className="selector-border">
            <div className="selector">
                {modelos.map((modelo, index) => (
                    <div
                    key={index}
                    className={`modelo-opcao ${selecionado === index ? "selecionado" : ""}`}
                    onClick={() => {
                        setSelecionado(index);
                        onSelect(modelos[index]);
                    }}
                    >
                    {modelo.modelo}
                    </div>
                ))}
            </div>
        </div>
        );
}

export default ModelSelectorList;