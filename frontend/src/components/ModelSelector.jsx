import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../config';

function ModelSelector({ setTalhaSelecionada, talha, config, setConfig }){

    const [filtros, setFiltros] = useState({
        correnteCabo: "",
        capacidade: "",
        tipoTrole: "",
        cursoUtilGancho: ""
    });

    let opcoesTensao = [];
        if (talha) {
            if (talha.tensaoTrifasica === "220/380V - Trifásica") {
                opcoesTensao = ["380V - Trifásica", "220V - Trifásica"];
            } else {
                opcoesTensao = [talha.tensaoTrifasica];
        }
    }

    useEffect(() => {
        if (talha){
            setConfig(prev => ({
                ...prev,
                talhaSelecionada: talha.modelo,
            }))
        }
        setConfig(prev => ({
            ...prev,
            tensao: opcoesTensao[0]
        }))
        
    }, [talha])

    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        const fetchModelos = async () => {
            try {
                const query = new URLSearchParams();

                if (filtros.correnteCabo) query.append("correnteCabo", filtros.correnteCabo);
                if (filtros.capacidade) query.append("capacidade", filtros.capacidade);
                if (filtros.tipoTrole) query.append("tipoTrole", filtros.tipoTrole);
                if (filtros.cursoUtilGancho) query.append("cursoUtilGancho", filtros.cursoUtilGancho);

                const response = await fetch(`${API_BASE_URL}/api/talhas/filtro?${query.toString()}`);
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
                <div className="modelselector-corpo">
                    <div className="modelselector-corpo-left">
                        <h2 className="frame-branco-title">Escolha o modelo:</h2>
                        <ModelSelectorList modelos={modelos} onSelect={setTalhaSelecionada} />
                    </div>
                    <div className="modelselector-corpo-left">
                        <h2 className="frame-branco-title">Filtros</h2>
                        <ModelSelectorFilter filtros={filtros} setFiltros={setFiltros} />
                    </div>
                </div>
                {talha && (
                        <div className="frame-unidade-caixa-selecao">
                            <h4 className="headerSelect">Tensão</h4>
                            <select
                                name="opcoesTensao" 
                                disabled={!talha}
                                value={config.tensao}
                                onChange={(e) => setConfig(prev => ({ ...prev, tensao: e.target.value }))}
                            >
                                {opcoesTensao.map((opcao, i) => (
                                    <option key={i} value={opcao}>{opcao}</option>
                                ))}
                            </select>
                        </div>
                )}
            </div>
        </div>
    )
}

export default ModelSelector;