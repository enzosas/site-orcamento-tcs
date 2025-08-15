import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";
import React, { useState, useEffect } from "react";

function ModelSelector({ setTalhaSelecionada }){

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

                setModelos(data);

                if (data.length > 0) {
                setTalhaSelecionada(data[0]);
            }
            
            } catch (error) {
                console.error("Erro ao buscar os modelos:", error);
            }
        };

        fetchModelos();
    }, [filtros, setTalhaSelecionada]);

    return (
        <div>
            <div className="frame-branco">
                <h2 className="frame-branco-title">Escolha o modelo:</h2>
                <ModelSelectorList modelos={modelos} onSelect={setTalhaSelecionada} />
                <hr></hr>
                <h2 className="frame-branco-title">Filtros</h2>
                <ModelSelectorFilter filtros={filtros} setFiltros={setFiltros} />
            </div>
            <div className="frame-checkbox-painel">
                <label >
                    <input type="checkbox"></input>
                    Incluir Painel de Comando
                </label>
            </div>
        </div>
    )
}

export default ModelSelector;