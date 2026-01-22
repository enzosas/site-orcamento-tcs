import "./Pagamento.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import { gerarDocx } from '../../../../../utils/gerarDocx';

function PagamentoAdministrador({ isOpen, onClose, pagamento, setPagamento, gerarDocxObjetos, numeroOrcamento }) {

    if (!isOpen) return null;

    const opcoesFormaPagamento = [
        "28 dias da nfe",
        "28/56 dias da nfe",
        "28/56/84 dias da nfe",
        "28/56/84/112 dias da nfe",
        "0/28 dias do pedido",
        "0/28/56 dias do pedido",
        "0/28/56/84 dias do pedido",
        "0/28/56/84/112 dias do pedido"
    ];

    const opcoesPrazoEntrega = [
        "15 - 20 dias",
        "20 - 30 dias",
        "30 - 45 dias",
        "45 - 60 dias",
        "60 - 90 dias",
        "90 - 120 dias",
        "Ver observações"
    ];

    const opcoesGarantia = [
        "6 meses",
        "12 meses",
    ];

    const opcoesValidadeOrcamento = [
        "7 dias",
        "10 dias",
        "15 dias",
        "20 dias",
        "30 dias",
        "45 dias",
        "60 dias"
    ];

    const opcoesFrete = [
        "CIF",
        "FOB",
        "Cliente Retira",
    ];

    const opcoesMontagem = [
        "Não Inclusa",
        "Inclusa",
        "Inclusa - Somente Mão de Obra",
        "Inclusa - Exceto Guincho, Andaime e Plataforma"
    ];

    const opcoesComissao = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const precoBaseTalha = pagamento.tipoPainel === "TCS" 
        ? gerarDocxObjetos.precos.totalTcs 
        : gerarDocxObjetos.precos.totalSch;

    const precoTotalGeral = precoBaseTalha 
        + Number(pagamento.ajusteTalha) 
        + Number(pagamento.valorMontagem) 
        + Number(pagamento.valorFrete);

    const formatadorPreco = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const handleGerarDocx = () => {
        gerarDocx(
            gerarDocxObjetos.talha,
            gerarDocxObjetos.config,
            gerarDocxObjetos.cliente,
            gerarDocxObjetos.precos,
            pagamento,
            gerarDocxObjetos.arquivo
        )
    }

    const handleChange = (campo, valor) => {
        setPagamento((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    return (
        <div className="pagamento__background">
            <div className="pagamento__window">
                <div className="pagamento__window__header">
                    <h1>Pagamento</h1>
                    {(gerarDocxObjetos.cliente?.razaoSocial || gerarDocxObjetos.cliente?.pessoaContato || numeroOrcamento) && (
                            <div className="pagamento__window__header__infobar">
                            {gerarDocxObjetos.cliente?.razaoSocial && (
                                <div className="pagamento__window__header__infobar__labelContent">
                                    <h2>Cliente</h2>
                                    <p>{gerarDocxObjetos.cliente.razaoSocial}</p>
                                </div>
                            )}
                            {gerarDocxObjetos.cliente?.pessoaContato && (
                            <div className="pagamento__window__header__infobar__labelContent">
                                <h2>Contato</h2>
                                <p>{gerarDocxObjetos.cliente.pessoaContato}</p>
                            </div>
                            )}
                            {numeroOrcamento && (
                                <div className="pagamento__window__header__infobar__labelContent">
                                    <h2>Número Orçamento</h2>
                                    <p>{numeroOrcamento}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="pagamento__window__main">
                    <div className="pagamento__window__main__coluna1">
                        <div className="pagamento__window__main__combobox">
                            <h4>Forma de Pagamento</h4>
                            <select
                                value={pagamento.formaPagamento}
                                onChange={(e) => handleChange("formaPagamento", e.target.value)}
                            >
                                {opcoesFormaPagamento.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Prazo de Entrega</h4>
                            <select
                                value={pagamento.prazoEntrega}
                                onChange={(e) => handleChange("prazoEntrega", e.target.value)}
                            >
                                {opcoesPrazoEntrega.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Prazo de Garantia</h4>
                            <select
                                value={pagamento.prazoGarantia}
                                onChange={(e) => handleChange("prazoGarantia", e.target.value)}
                            >
                                {opcoesGarantia.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Validade do orçamento</h4>
                            <select
                                value={pagamento.validadeOrcamento}
                                onChange={(e) => handleChange("validadeOrcamento", e.target.value)}
                            >
                                {opcoesValidadeOrcamento.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Frete</h4>
                            <select
                                value={pagamento.frete}
                                onChange={(e) => handleChange("frete", e.target.value)}
                            >
                                {opcoesFrete.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Montagem</h4>
                            <select
                                value={pagamento.montagem}
                                onChange={(e) => handleChange("montagem", e.target.value)}
                            >
                                {opcoesMontagem.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pagamento__window__main__coluna2">
                        <div className="pagamento__window__main__dupla">
                            <div className="pagamento__window__main__combobox">
                                <h4>Comissão de venda</h4>
                                <select
                                    value={pagamento.percentualComissaoVendas}
                                    onChange={(e) => {
                                        handleChange("percentualComissaoVendas", e.target.value)
                                    }}
                                >
                                    {opcoesComissao.map((item, index) => (
                                        <option key={index} value={item}>{item}%</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Ajuste Talha (+/- R$)</h4>
                            <input 
                                name="ajusteTalha" 
                                value={pagamento.ajusteTalha} 
                                type="number"
                                onChange={(e) => handleChange("ajusteTalha", e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Valor de Montagem (R$)</h4>
                            <input 
                                name="valorMontagem" 
                                type="number"
                                value={pagamento.valorMontagem} 
                                onChange={(e) => handleChange("valorMontagem", e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Valor de Frete (R$)</h4>
                            <input 
                                name="valorFrete"
                                type="number"
                                value={pagamento.valorFrete} 
                                onChange={(e) => handleChange("valorFrete", e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Observações</h4>
                            <textarea
                                name="observacoes"
                                rows="5"
                                value={pagamento.observacoes}
                                onChange={(e) => handleChange("observacoes", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="pagamento__window__main__coluna3">
                        <div className="pagamento__window__main__combobox">
                            <h4>Quantidade</h4>
                            <input 
                                name="quantidade" 
                                value={pagamento.quantidade} 
                                onChange={(e) => handleChange("quantidade", e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <div className="pagamento__window__main__combobox">
                            <h4>Tipo do Painel</h4>
                            <select
                                value={pagamento.tipoPainel}
                                onChange={(e) => {
                                    handleChange("tipoPainel", e.target.value)
                                }}
                            >
                                <option>Schneider</option>
                                <option>TCS</option>
                            </select>
                        </div>
                        <div className="pagamento__window__main__preco">
                            <div className="pagamento__window__main__preco__linha">
                                <div className="pagamento__window__main__preco__linha__tag">
                                    Valor Talha
                                </div>
                                <div className="pagamento__window__main__preco__linha__pontinhos"/>
                                <div className="pagamento__window__main__preco__linha__valor">
                                    {pagamento.tipoPainel === "TCS" ? formatadorPreco.format(gerarDocxObjetos.precos.totalTcs) : formatadorPreco.format(gerarDocxObjetos.precos.totalSch)}
                                </div>
                            </div>
                            <div className="pagamento__window__main__preco__linha">
                                <div className="pagamento__window__main__preco__linha__tag">
                                    Ajuste
                                </div>
                                <div className="pagamento__window__main__preco__linha__pontinhos"/>
                                <div className="pagamento__window__main__preco__linha__valor">
                                    {formatadorPreco.format(pagamento.ajusteTalha)}
                                </div>
                            </div>
                            <div className="pagamento__window__main__preco__linha">
                                <div className="pagamento__window__main__preco__linha__tag">
                                    Valor de Montagem
                                </div>
                                <div className="pagamento__window__main__preco__linha__pontinhos"/>
                                <div className="pagamento__window__main__preco__linha__valor">
                                    {formatadorPreco.format(pagamento.valorMontagem)}
                                </div>
                            </div>
                            <div className="pagamento__window__main__preco__linha">
                                <div className="pagamento__window__main__preco__linha__tag">
                                    Valor de Frete
                                </div>
                                <div className="pagamento__window__main__preco__linha__pontinhos"/>
                                <div className="pagamento__window__main__preco__linha__valor">
                                    {formatadorPreco.format(pagamento.valorFrete)}
                                </div>
                            </div>
                            <div className="pagamento__window__main__preco__linha--final">
                                <div className="pagamento__window__main__preco__linha__tag">
                                    Total Talha
                                </div>
                                <div className="pagamento__window__main__preco__linha__pontinhos"/>
                                <div className="pagamento__window__main__preco__linha__valor">
                                    {formatadorPreco.format(precoTotalGeral)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagamento__window__footer">
                    <button className="botao_branco" onClick={() => {
                        onClose();
                    }}>
                        Voltar
                    </button>
                    <button onClick={() => {handleGerarDocx()}}>
                        Gerar DOCX
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default PagamentoAdministrador;