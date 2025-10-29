import "./ModelSelector.css";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../../config';

function ModelSelectorFilter({ filtros, setFiltros }) {
    const [correntes, setCorrentes] = useState([]);
    const [capacidades, setCapacidades] = useState([]);
    const [tiposTrole, setTiposTrole] = useState([]);
    const [cursosGancho, setCursosGancho] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/talhas/distinct-correnteCabo`)
            .then((res) => res.json())
            .then((data) => setCorrentes(data))
            .catch((err) => console.error("Erro ao carregar correntes:", err));

        fetch(`${API_BASE_URL}/api/talhas/distinct-capacidade`)
            .then((res) => res.json())
            .then((data) => setCapacidades(data))
            .catch((err) => console.error("Erro ao carregar capacidades:", err));

        fetch(`${API_BASE_URL}/api/talhas/distinct-tipoTrole`)
            .then((res) => res.json())
            .then((data) => setTiposTrole(data))
            .catch((err) => console.error("Erro ao carregar tipos de trole:", err));
        fetch(`${API_BASE_URL}/api/talhas/distinct-cursoUtilGancho`)
            .then((res) => res.json())
            .then((data) => setCursosGancho(data))
            .catch((err) => console.error("Erro ao carregar cursos de gancho:", err));
    }, []);

    const handleChange = (campo, valor) => {
        setFiltros(prev => ({ ...prev, [campo]: valor }));
    };

    return (
        <div className="model-filter">
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Cabo / Corrente</h4>
                <select
                    value={filtros.correnteCabo}
                    onChange={(e) => handleChange("correnteCabo", e.target.value)}
                >
                    <option value="">Sem filtro</option>
                    {correntes.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="model-filter-unidade">
                <h4 className="headerSelect">Capacidade</h4>
                <select
                    value={filtros.capacidade}
                    onChange={(e) => handleChange("capacidade", e.target.value)}
                >
                    <option value="">Sem filtro</option>
                    {capacidades.map((item, index) => (
                        <option key={index} value={item}>{item} kg</option>
                    ))}
                </select>
            </div>

            <div className="model-filter-unidade">
                <h4 className="headerSelect">Tipo de Trole</h4>
                <select
                    value={filtros.tipoTrole}
                    onChange={(e) => handleChange("tipoTrole", e.target.value)}
                >
                    <option value="">Sem filtro</option>
                    {tiposTrole.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="model-filter-unidade">
                <h4 className="headerSelect">Curso Útil do Gancho</h4>
                <select
                    value={filtros.cursoUtilGancho}
                    onChange={(e) => handleChange("cursoUtilGancho", e.target.value)}
                >
                    <option value="">Sem filtro</option>
                    {cursosGancho.map((item, index) => (
                        <option key={index} value={item}>{item} metros</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ModelSelectorFilter;
