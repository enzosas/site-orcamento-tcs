import "./Pricing.css"
import LoadingDots from './LoadingDots';
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../../config';


async function fetchOrcamentoCompleto(config, signal) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/preco/orcamentoCompleto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
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

function Pricing({ config, precos, setPrecos }){

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        setError(null);
        
        const fetchPrecos = async () => {
            if (config && config.talhaSelecionada && config.talhaSelecionada !== "") {
                setIsLoading(true);
                try {
                    const orcamento = await fetchOrcamentoCompleto(config, controller.signal);
                    
                    setPrecos(() => ({
                        totalSch: orcamento.totalSch,
                        totalTcs: orcamento.totalTcs,
                        circuitoSch: orcamento.circuitoSch,
                        circuitoTcs: orcamento.circuitoTcs,
                        adaptadorViga: orcamento.adaptadorViga,
                        talhaSemCircuito: orcamento.talhaSemCircuito
                    }))
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
                        (precos.talhaSemCircuito !== null ? formatadorPreco.format(precos.talhaSemCircuito) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Adaptador de Viga</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precos.adaptadorViga !== null ? formatadorPreco.format(precos.adaptadorViga) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico Schneider</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precos.circuitoSch !== null ? formatadorPreco.format(precos.circuitoSch) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Circuito Elétrico TCS</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precos.circuitoTcs !== null ? formatadorPreco.format(precos.circuitoTcs) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Total com Painel Schneider</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precos.totalSch !== null ? formatadorPreco.format(precos.totalSch) : "-"))}</div>
            </div>
            <div className="unidade">
                <p className="descricao">Total Com Painel TCS</p>
                <div className="dinheiro">{error? "Erro" : 
                    (isLoading ? <LoadingDots /> :
                        (precos.totalTcs !== null ? formatadorPreco.format(precos.totalTcs) : "-"))}</div>
            </div>
        </div>
    )
}

export default Pricing;