import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";
import React, { useState, useEffect } from "react";

function ModelSelector(){

    const [filtros, setFiltros] = useState({
        correnteCabo: "",
        capacidade: "",
        tipoTrole: "",
        cursoUtilGancho: ""
    });

    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        const fetchModelos = async () => {
            try {
                const query = new URLSearchParams();

                if (filtros.correnteCabo) query.append("correnteCabo", filtros.correnteCabo);
                if (filtros.capacidade) query.append("capacidade", filtros.capacidade);
                if (filtros.tipoTrole) query.append("tipoTrole", filtros.tipoTrole);
                if (filtros.cursoUtilGancho) query.append("cursoUtilGancho", filtros.cursoUtilGancho);

                const response = await fetch(`http://localhost:8081/api/talhas/filtro?${query.toString()}`);
                const data = await response.json();

                const nomesDosModelos = data.map(talha => talha.modelo);
                setModelos(nomesDosModelos);

            } catch (error) {
                console.error("Erro ao buscar os modelos:", error);
            }
        };

        fetchModelos();
    }, [filtros]);

    return (
        <div className="frame-branco">
            <h2 className="frame-branco-title">Escolha o modelo:</h2>
            <ModelSelectorList modelos={modelos} />
            <hr></hr>
            <h2 className="frame-branco-title">Filtros</h2>
            <ModelSelectorFilter filtros={filtros} setFiltros={setFiltros} />
        </div>
    )
}

export default ModelSelector;