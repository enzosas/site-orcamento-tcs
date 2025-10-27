import "./Pricing.css"
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../config';


async function fetchOrcamentoCompleto(config) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/preco/orcamentoCompleto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - [Backend: ${errorBody}]`);
        }
        
        const orcamento = await response.json();
        return orcamento;
        
    } catch (error) {
        console.error(`Falha ao calcular o orçamento completo:`, error);
        return null; 
    }
}

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function Pricing({ config }){

    const [precoTotalSch, setPrecoTotalSch] = useState(null);
    const [precoTotalTcs, setPrecoTotalTcs] = useState(null);
    const [circuitoTcs, setCircuitoTcs] = useState(null);
    const [circuitoSch, setCircuitoSch] = useState(null);
    const [adaptadorViga, setAdaptadorViga] = useState(null);
    const [talhaSemCircuito, setTalhaSemCircuito] = useState(null);

    useEffect(() => {
        
        setPrecoTotalSch(null);
        setPrecoTotalTcs(null);
        setCircuitoTcs(null);
        setCircuitoSch(null);
        setAdaptadorViga(null);
        setTalhaSemCircuito(null);

        const fetchPrecos = async () => {
            if (config && config.talhaSelecionada && config.talhaSelecionada !== "") {
                const orcamento = await fetchOrcamentoCompleto(config);

                if (orcamento) {
                    setTalhaSemCircuito(orcamento.talhaSemCircuito);
                    setAdaptadorViga(orcamento.adaptadorViga);
                    setCircuitoSch(orcamento.circuitoSch);
                    setCircuitoTcs(orcamento.circuitoTcs);
                    setPrecoTotalSch(orcamento.totalSch);
                    setPrecoTotalTcs(orcamento.totalTcs);
                }
            }
        };

        fetchPrecos();
        
    }, [config]);

    return (
        <div className="main-pricing">
            
            <div className="unidade">
                <p className="descricao">Talha Elétrica sem circuito</p>
                <p className="dinheiro">{talhaSemCircuito !== null ? formatadorPreco.format(talhaSemCircuito) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Adaptador de Viga</p>
                <p className="dinheiro">{adaptadorViga !== null ? formatadorPreco.format(adaptadorViga) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico Schneider</p>
                <p className="dinheiro">{circuitoSch !== null ? formatadorPreco.format(circuitoSch) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico TCS</p>
                <p className="dinheiro">{circuitoTcs !== null ? formatadorPreco.format(circuitoTcs) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total com Painel Schneider</p>
                <p className="dinheiro">{precoTotalSch !== null ? formatadorPreco.format(precoTotalSch) : "-"}</p>
            </div>
            <div className="unidade">
                <p className="descricao">Total Com Painel TCS</p>
                <p className="dinheiro">{precoTotalTcs !== null ? formatadorPreco.format(precoTotalTcs) : "-"}</p>
            </div>
        </div>
    )
}

export default Pricing;