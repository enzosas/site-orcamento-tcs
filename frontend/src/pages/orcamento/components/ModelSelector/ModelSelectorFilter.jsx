import "./ModelSelector.css";
import React, { useEffect, useState, useMemo } from "react";
import { API_BASE_URL } from '../../../../config';
import api from '../../../../services/api.js'

function ModelSelectorFilter({ filtros, setFiltros, modelos }) {
    const correntes = useMemo(() => {
        const valoresUnicos = [...new Set(modelos.map(m => m.correnteCabo).filter(Boolean))];
        return valoresUnicos.sort();
    }, [modelos]);

    const capacidades = useMemo(() => {
        const valoresUnicos = [...new Set(modelos.map(m => m.capacidade).filter(Boolean))];
        return valoresUnicos.sort((a, b) => a - b);
    }, [modelos]);

    const tiposTrole = useMemo(() => {
        const valoresUnicos = [...new Set(modelos.map(m => m.tipoTrole).filter(Boolean))];
        return valoresUnicos.sort();
    }, [modelos]);

    const cursosGancho = useMemo(() => {
        const valoresUnicos = [...new Set(modelos.map(m => m.cursoUtilGancho).filter(Boolean))];
        return valoresUnicos.sort((a, b) => a - b);
    }, [modelos]);

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
