import "./ModelSelector.css"
import React, { useEffect, useState } from "react";


function ModelSelectorFilter(){

    const [correntes, setCorrentes] = useState([]);
     useEffect(() => {
        fetch("http://localhost:8081/api/talhas/distinct-correnteCabo")
            .then((response) => response.json())
            .then((data) => setCorrentes(data))
            .catch((error) => console.error("Erro ao carregar correntes:", error));
    }, []);

    return (
        <div className="model-filter">
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Cabo / Corrente</h4>
                <select>
                    <option value="">Sem filtro</option>
                    {correntes.map((corrente, index) => (
                        <option key={index} value={corrente}>
                            {corrente}
                        </option>
                    ))}
                </select>
            </div>
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Capacidade</h4>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Tipo de Trole</h4>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className="model-filter-unidade">
                <h4 className="headerSelect">Curso Útil do Gancho</h4>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </div>
    )
}

export default ModelSelectorFilter;