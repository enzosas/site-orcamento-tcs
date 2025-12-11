import "./Pricing.css"
import LoadingDots from './LoadingDots';
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../../config';


async function fetchOrcamentoCompleto(config, signal) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/preco/orcamentoCompleto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
            signal: signal,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - [Backend: ${errorBody}]`);
        }
        
        const orcamento = await response.json();
        return orcamento;
        
    } catch (error) {

        if (error.name !== 'AbortError') {
            console.error(`Falha ao calcular o orçamento completo:`, error);
        }
        throw error;
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

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        
        setPrecoTotalSch(null);
        setPrecoTotalTcs(null);
        setCircuitoTcs(null);
        setCircuitoSch(null);
        setAdaptadorViga(null);
        setTalhaSemCircuito(null);
        setError(null);
        
        const fetchPrecos = async () => {
            if (config && config.talhaSelecionada && config.talhaSelecionada !== "") {
                setIsLoading(true);
                try {
                    const orcamento = await fetchOrcamentoCompleto(config, controller.signal);
                    
                    setTalhaSemCircuito(orcamento.talhaSemCircuito);
                    setAdaptadorViga(orcamento.adaptadorViga);
                    setCircuitoSch(orcamento.circuitoSch);
                    setCircuitoTcs(orcamento.circuitoTcs);
                    setPrecoTotalSch(orcamento.totalSch);
                    setPrecoTotalTcs(orcamento.totalTcs);
                } catch (err) {
                    if (err.name != 'AbortError') {
                        setError(err);
                    }
                } finally {
                    if (!controller.signal.aborted) {
                    setIsLoading(false);
                    }
                }
            }
        };

        fetchPrecos();
        return () => {
            controller.abort();
        };
        
    }, [config]);

    return (
        <div className="main-pricing">
            
            <div className="unidade">
                <p className="descricao">Talha Elétrica sem circuito</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (talhaSemCircuito !== null ? formatadorPreco.format(talhaSemCircuito) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Adaptador de Viga</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (adaptadorViga !== null ? formatadorPreco.format(adaptadorViga) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico Schneider</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (circuitoSch !== null ? formatadorPreco.format(circuitoSch) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico TCS</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (circuitoTcs !== null ? formatadorPreco.format(circuitoTcs) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Total com Painel Schneider</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precoTotalSch !== null ? formatadorPreco.format(precoTotalSch) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Total Com Painel TCS</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precoTotalTcs !== null ? formatadorPreco.format(precoTotalTcs) : "-"))}</div>
            </div>
        </div>
    )
}

export default Pricing;