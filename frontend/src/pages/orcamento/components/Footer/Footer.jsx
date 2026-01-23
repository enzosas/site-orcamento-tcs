import "./Footer.css"
import React, { useState, useEffect, useRef, useContext } from 'react';
import Import from "./Import.jsx"
import { API_BASE_URL } from "../../../../config.js";
import Cliente from "./Cliente.jsx";
import Pdf from "./PdfViewerTela.jsx"
import Adm from "./Administracao/Administracao.jsx"
import { gerarDocx } from '../../../../utils/gerarDocx';
import { AuthContext } from '../../../../context/AuthContext.jsx'
import PagamentoAdministrador from "./Pagamento/PagamentoAdministrador.jsx";
import PagamentoCliente from "./Pagamento/PagamentoCliente.jsx";


const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function Footer({ talha, setTalhaSelecionada, config, setConfig, precos }){

    const { user } = useContext(AuthContext);
    const [arquivo, setArquivo] = useState(null);

    function getCodigoConfig(){

        if (codigo === null) {
            return "Configuração não salva."
        }
        else return codigo;
    }

    const handlePagamento = () => {
        if (!validarClientePessoaContato()) {
            alert("Preencha todos os campos na seção cliente para gerar o orçamento.");
        } else {
            setPagamentoAberto(true);
        }
    }
    
    
    const [codigo, setCodigo] = useState(null);
    const [copiado, setCopiado] = useState(false);
    const [salvo, setSalvo] = useState(false);
    const [importAberto, setImportAberto] = useState(false);
    const [clienteAberto, setClienteAberto] = useState(false);
    const [pdfAberto, setPdfAberto] = useState(false);
    const [admAberto, setAdmAberto] = useState(false);
    const [pagamentoAberto, setPagamentoAberto] = useState(false);
    const [mostrarResumoCliente, setMostrarResumoCliente] = useState(false);
    const isImporting = useRef(false);
    
    const [cliente, setCliente] = useState({
        cnpj: "",
        razaoSocial: "",
        inscricaoEstadual: "",
        cep: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        telefone: "",
        pessoaContato: "",
        email: "",
        whatsapp: ""
	});

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

    const [pagamento, setPagamento] = useState({
        formaPagamento: opcoesFormaPagamento[0],
        prazoEntrega: opcoesPrazoEntrega[0],
        prazoGarantia: opcoesGarantia[0],
        validadeOrcamento: opcoesValidadeOrcamento[0],
        frete: opcoesFrete[0],
        montagem: opcoesMontagem[0],
        percentualComissaoVendas: 0,
        ajusteTalha: 0,
        valorMontagem: 0,
        valorFrete: 0,
        valorComissaoVenda: 0,
        observacoes: "",
        quantidade: 1,
        tipoPainel: "TCS",
        precoUnitario: 0,
        precoTotal: 0
    });

    const gerarDocxObjetos = {
        talha,
        config,
        cliente,
        precos,
        arquivo
    }

    useEffect(() => {
        if (importAberto || clienteAberto || pdfAberto || admAberto || pagamentoAberto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [importAberto, clienteAberto, pdfAberto, admAberto, pagamentoAberto]);

    const renderPagamento = () => {
        if (user?.isAdmin) {
            return <PagamentoAdministrador 
                isOpen={pagamentoAberto} 
                onClose={() => setPagamentoAberto(false)} 
                pagamento={pagamento}
                setPagamento={setPagamento}
                gerarDocxObjetos={gerarDocxObjetos}
                numeroOrcamento={codigo}
                />
            } else {
                return <PagamentoCliente 
                isOpen={pagamentoAberto} 
                onClose={() => setPagamentoAberto(false)}
                pagamento={pagamento}
                setPagamento={setPagamento}
                gerarDocxObjetos={gerarDocxObjetos}
                numeroOrcamento={codigo}
                />
        }
    }

    const validarCliente = () => {
        const { pessoaContato, email, whatsapp, ...camposObrigatorios } = cliente;
        const valido = Object.values(camposObrigatorios).every(valor => {
            return valor !== null && valor.trim() !== "";
        });
        return valido;
    }

    const validarClientePessoaContato = () => {
        const valoresContato = [
            cliente.pessoaContato, 
            cliente.email, 
            cliente.whatsapp
        ];
        const valido = valoresContato.every(valor => {
            return valor !== null && valor !== undefined && valor.trim() !== "";
        })
        return valido;
    }

    useEffect(() => {
        setMostrarResumoCliente(validarCliente());
    }, [cliente]);
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(codigo)
        .then(() => {
            setCopiado(true);
            setTimeout(() => {
                setCopiado(false);
            }, 2000);
        })
        .catch(err => {
            alert('Falha ao copiar o texto: ', err);
        });
    };

    const handleSaveClick = async () => {
        
        if (salvo) {
            return;
        }

        const dadosParaEnviar = {
            config: config,
            cliente: cliente
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/orcamentos/salvar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro na requisição: ${response.status} - [Backend: ${errorBody}]`);
            }
            const novoCodigo = (await response.json()).id;
            setCodigo(novoCodigo);
            setSalvo(true);
            alert(`Configuração salva com o código: ${novoCodigo}`)
            setTimeout(() => {
                setSalvo(false);
            }, 2000);
        } catch (error) {

            if (error.name !== 'AbortError') {
                console.error(`Falha ao salvar o orçamento:`, error);
            }
            throw error;
        }
    };

    useEffect(() => {

        if (isImporting.current) {
            isImporting.current = false;
        } else {
            setCodigo(null);
        }

    }, [config]);

    return (
         <div className="main-footer">
            {user?.isAdmin && (
                <div className="frame-config">
                    <p>Código da configuração</p>
                    <div className="config--retangulo_branco">
                        <div className="config--retangulo_branco--esquerda">
                            <p>{getCodigoConfig()}</p>
                        </div>
                        <div className="config--retangulo_branco--direita">
                            <button className="botao_branco" aria-label="Copiar código" onClick={handleCopyClick} style={{ position: 'relative' }}>
                                <span style={{ opacity: copiado ? 0 : 1, transition: 'opacity 0.2s' }}>
                                    Copiar
                                </span>
                                {copiado && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        transition: 'opacity 0.2s'
                                    }}>
                                        <CheckIcon />
                                    </div>
                                )}
                            </button>
                            <button className="botao_branco" aria-label="Importar" onClick={() => setImportAberto(true)}>
                                Importar
                            </button>
                            <button className="botao_branco" aria-label="Salvar" onClick={handleSaveClick} style={{ position: 'relative' }} disabled={codigo}>
                                <span style={{ opacity: salvo ? 0 : 1, transition: 'opacity 0.2s' }}>
                                    Salvar
                                </span>
                                {salvo && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        transition: 'opacity 0.2s'
                                    }}>
                                        <CheckIcon />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <Import
                        isOpen = {importAberto}
                        onClose={() => setImportAberto(false)}
                        config={config}
                        setConfig={setConfig}
                        setTalhaSelecionada={setTalhaSelecionada}
                        setCodigo={setCodigo}
                        isImporting={isImporting}
                        cliente={cliente}
                        setCliente={setCliente}
                    />
                </div>
            )}
            <Cliente
                isOpen = {clienteAberto}
                onClose={() => setClienteAberto(false)}
                cliente={cliente}
                setCliente={setCliente}
            />
            <Pdf
                isOpen = {pdfAberto}
                onClose = {() => setPdfAberto(false)}
                talha = {talha} 
                config = {config} 
                cliente = {cliente} 
                precos = {precos}
            />
            <Adm
                isOpen = {admAberto}
                onClose={() => setAdmAberto(false)}
                arquivo={arquivo}
                setArquivo={setArquivo}
            />
            {renderPagamento()}
            <div className="footer_frame_botoes">
                <button aria-label="Cliente" onClick={() => setClienteAberto(true)}>
                    Cliente
                </button>
                <button aria-label="Pagamento" onClick={() => handlePagamento()}>
                    Pagamento
                </button>
            </div>
            {mostrarResumoCliente ? (
                <div>
                    <p>Empresa Cliente: {cliente.razaoSocial}</p>
                    {validarClientePessoaContato()? (
                        <p>Responsável: {cliente.pessoaContato}</p>
                    ) : (
                        <p>Pessoa para contato não preenchida</p>
                    )}
                </div>
            ) : (
                <div>
                    <p>Empresa não preenchida</p>
                </div>
            )}
            {user?.isAdmin && (
                <div className="footer_frame_botoes admbutton">
                    <button className="botao_branco" aria-label="Admin" onClick={() => setAdmAberto(true)}>
                        Administração
                    </button>
                </div>
            )}
         </div>
        
    )
}

export default Footer;
