import "./Pricing.css"
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../config';


function Pricing({ config }){

    const [precoTotalSch, setPrecoTotalSch] = useState(null);
    const [precoTotalTcs, setPrecoTotalTcs] = useState(null);
    const [circuitoTcs, setCircuitoTcs] = useState(null);
    const [circuitoSch, setCircuitoSch] = useState(null);
    const [adaptadorViga, setAdaptadorViga] = useState(null);
    const [talhaSemCircuito, setTalhaSemCircuito] = useState(null);

    async function calcularPrecoTotalSch(config) {

        try {
            const response = await fetch(`${API_BASE_URL}/api/preco/totalSch`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(config), 
            });
            console.log(JSON.stringify(config));
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            
            const preco = await response.json();
            return preco;
            
        } catch (error) {
            console.error("Falha ao calcular o preço:", error);
            return null; 
        }
    }
    
    useEffect(() => {
        
        console.log(config.talhaSelecionada);
        console.log("banana");
        const fetchPreco = async () => {
            if (config.talhaSelecionada !== "") {
                console.log("Condição válida, buscando preço...");
                const precoCalculado = await calcularPrecoTotalSch(config);
                setPrecoTotalSch(precoCalculado);
            } else {
                setPrecoTotalSch(null);
            }
        };
        fetchPreco();
    }, [config]);

    return (
        <div className="main-pricing">
            
            <div className="unidade">
                <p className="descricao">Talha Elétrica sem circuito</p>
                <p className="dinheiro">{talhaSemCircuito != null ? talhaSemCircuito.toFixed(2) : "-"}</p>

            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico Schneider</p>
                <p className="dinheiro">{circuitoSch != null ? circuitoSch : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico TCS</p>
                <p className="dinheiro">{circuitoTcs != null ? circuitoTcs : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Adaptador de Viga</p>
                <p className="dinheiro">{adaptadorViga != null ? adaptadorViga : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total com Painel Schneider</p>
                <p className="dinheiro">{precoTotalSch != null ? ("R$ " + precoTotalSch.toFixed(2)) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total Com Painel TCS</p>
                <p className="dinheiro">{precoTotalTcs != null ? precoTotalTcs : "-"}</p>
            </div>
        </div>
    )
}

export default Pricing;