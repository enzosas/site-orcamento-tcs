import "./ModelSelector.css"
import React, { useState } from "react";


function ModelSelectorList(){
    const modelos = [
    "TCS002D06FX",
    "TCS002D06TF",
    "TCS002D06MN",
    "TCS005D06FX",
    "TCS005D06TF",
    "TCS006D06FX",
    "TCS007D06TF"
  ];

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