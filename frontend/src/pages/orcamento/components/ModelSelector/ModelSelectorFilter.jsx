import "./ModelSelector.css";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../../config';
import api from '../../../../services/api.js'

function ModelSelectorFilter({ filtros, setFiltros }) {
    const [correntes, setCorrentes] = useState([]);
    const [capacidades, setCapacidades] = useState([]);
    const [tiposTrole, setTiposTrole] = useState([]);
    const [cursosGancho, setCursosGancho] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const carregarFiltros = async () => {
            try {
                const [resCorrente, resCapacidade, resTrole, resCurso] = await Promise.all([
                    api.get('/api/talhas/distinct-correnteCabo'),
                    api.get('/api/talhas/distinct-capacidade'),
                    api.get('/api/talhas/distinct-tipoTrole'),
                    api.get('/api/talhas/distinct-cursoUtilGancho')
                ]);

                setCorrentes(resCorrente.data);
                setCapacidades(resCapacidade.data);
                setTiposTrole(resTrole.data);
                setCursosGancho(resCurso.data);

            } catch (error) {
                console.error("Erro ao carregar os dados dos filtros:", error);
            }
        };
        carregarFiltros();
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
