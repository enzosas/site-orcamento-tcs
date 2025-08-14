import "./ModelSelector.css";
import React, { useEffect, useState } from "react";

function ModelSelectorFilter() {
    const [correntes, setCorrentes] = useState([]);
    const [capacidades, setCapacidades] = useState([]);
    const [tiposTrole, setTiposTrole] = useState([]);
    const [cursosGancho, setCursosGancho] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/talhas/distinct-correnteCabo")
            .then((res) => res.json())
            .then((data) => setCorrentes(data))
            .catch((err) => console.error("Erro ao carregar correntes:", err));

        fetch("http://localhost:8081/api/talhas/distinct-capacidade")
            .then((res) => res.json())
            .then((data) => setCapacidades(data))
            .catch((err) => console.error("Erro ao carregar capacidades:", err));

        fetch("http://localhost:8081/api/talhas/distinct-tipoTrole")
            .then((res) => res.json())
            .then((data) => setTiposTrole(data))
            .catch((err) => console.error("Erro ao carregar tipos de trole:", err));

        fetch("http://localhost:8081/api/talhas/distinct-cursoUtil")
            .then((res) => res.json())
            .then((data) => setCursosGancho(data))
            .catch((err) => console.error("Erro ao carregar cursos de gancho:", err));
    }, []);

    return (
        <div className="model-filter">
            {/* Cabo / Corrente */}
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Cabo / Corrente</h4>
                <select>
                    <option value="">Sem filtro</option>
                    {correntes.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            {/* Capacidade */}
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Capacidade</h4>
                <select>
                    <option value="">Sem filtro</option>
                    {capacidades.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            {/* Tipo de Trole */}
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Tipo de Trole</h4>
                <select>
                    <option value="">Sem filtro</option>
                    {tiposTrole.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            {/* Curso Útil do Gancho */}
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Curso Útil do Gancho</h4>
                <select>
                    <option value="">Sem filtro</option>
                    {cursosGancho.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ModelSelectorFilter;
