import "./Footer.css"
import React, { useState, useEffect, useRef, useContext } from 'react';
import Import from "./Import.jsx"
import { API_BASE_URL } from "../../../../config.js";
import Cliente from "./Cliente.jsx";
import Pdf from "./PdfViewerTela.jsx"
import Adm from "./Administracao/Administracao.jsx"
import Ponte from "./Ponte/Ponte.jsx";
import { gerarDocx } from '../../../../utils/gerarDocx';
import { AuthContext } from '../../../../context/AuthContext.jsx'
import PagamentoAdministrador from "./Pagamento/PagamentoAdministrador.jsx";
import api from '../../../../services/api.js'


const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function Footer({ talha, setTalhaSelecionada, config, setConfig, precos, preferencias, setPreferencias, precosPesosPonte, setPrecosPesosPonte, ponteConfig, setPonteConfig }){

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
    const [ponteAberto, setPonteAberto] = useState(false);
    const [pdfAberto, setPdfAberto] = useState(false);
    const [admAberto, setAdmAberto] = useState(false);
    const [pagamentoAberto, setPagamentoAberto] = useState(false);
    const [mostrarResumoCliente, setMostrarResumoCliente] = useState(false);
    const isImporting = useRef(false);
    const token = localStorage.getItem('token');
    
    const [opcoesFormaPagamento, setOpcoesFormaPagamento] = useState([]);
    const [opcoesPrazoEntrega, setOpcoesPrazoEntrega] = useState([]);
    const [opcoesGarantia, setOpcoesGarantia] = useState([]);
    const [opcoesValidadeOrcamento, setOpcoesValidadeOrcamento] = useState([]);
    const [opcoesFrete, setOpcoesFrete] = useState([]);
    const [opcoesMontagem, setOpcoesMontagem] = useState([]);
    const [opcoesComissao, setOpcoesComissao] = useState([]);

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

    const [pagamento, setPagamento] = useState({
        formaPagamento: "",
        prazoEntrega: "",
        prazoGarantia: "",
        validadeOrcamento: "",
        frete: "",
        montagem: "",
        percentualComissaoVendas: 0,
        ajusteTalha: 0,
        valorMontagem: 0,
        valorFrete: 0,
        valorComissaoVenda: 0,
        observacoes: "",
        quantidade: 1,
        tipoPainel: "TCS",
        orcamentoCalculado: {},
    });

    const gerarDocxObjetos = {
        talha,
        config,
        ponteConfig,
        cliente,
        precos,
        precosPesosPonte,
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
                precosPesosPonte={precosPesosPonte} 
                ponteConfig={ponteConfig}

                opcoesFormaPagamento={opcoesFormaPagamento}
                opcoesPrazoEntrega={opcoesPrazoEntrega}
                opcoesGarantia={opcoesGarantia}
                opcoesValidadeOrcamento={opcoesValidadeOrcamento}
                opcoesFrete={opcoesFrete}
                opcoesMontagem={opcoesMontagem}
                opcoesComissao={opcoesComissao}
                />
        } else {
                return 
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

        if (!validarClientePessoaContato()) {
            alert("Preencha todos os campos na seção cliente para salvar o orçamento.");
            return
        }

        const dadosParaEnviar = {
            config: config,
            cliente: cliente,
            username: user.username,
            ponteConfig: ponteConfig
        }

        try {
            const response = await api.post('/api/orcamentos/salvar', dadosParaEnviar);
            const novoCodigo = response.data.id;
            setCodigo(novoCodigo);
            setSalvo(true);
            alert(`Configuração salva com o código: ${novoCodigo}`)
            setTimeout(() => {
                setSalvo(false);
            }, 2000);
        } catch (error) {
            const errorMsg = error.response?.data || error.message;
            console.error("Erro ao salvar orçamento:", error);
            alert(`Erro na requisição: ${error.response?.status || 'Conexão'} - [Backend: ${errorMsg}]`);
        }
    };

    useEffect(() => {

        if (isImporting.current) {
            isImporting.current = false;
        } else {
            setCodigo(null);
        }

    }, [config, cliente, ponteConfig]);

    useEffect(() => {
        const carregarOpcoesOrcamento = async () => {
            try {
                const response = await api.get('/api/max/getMiscOptions'); 
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

                if (data) {
                    setOpcoesFormaPagamento(data.opcoesFormaPagamento || []);
                    setOpcoesPrazoEntrega(data.opcoesPrazoEntrega || []);
                    setOpcoesGarantia(data.opcoesGarantia || []);
                    setOpcoesValidadeOrcamento(data.opcoesValidadeOrcamento || []);
                    setOpcoesFrete(data.opcoesFrete || []);
                    setOpcoesMontagem(data.opcoesMontagem || []);
                    setOpcoesComissao(data.opcoesComissao || []);

                    setPagamento(prev => ({
                        ...prev,
                        formaPagamento: data.opcoesFormaPagamento?.[0] || "",
                        prazoEntrega: data.opcoesPrazoEntrega?.[0] || "",
                        prazoGarantia: data.opcoesGarantia?.[0] || "",
                        validadeOrcamento: data.opcoesValidadeOrcamento?.[0] || "",
                        frete: data.opcoesFrete?.[0] || "",
                        montagem: data.opcoesMontagem?.[0] || "",
                        percentualComissaoVendas: data.opcoesComissao?.[0] ?? 0
                    }));
                }
            } catch (error) {
                console.error("Erro ao carregar opcoes dinamicas do backend:", error);
            }
        };

        carregarOpcoesOrcamento();
    }, []);

    return (
         <div className="main-footer">
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
                preferencias={preferencias}
                setPreferencias={setPreferencias}
            />
            <Ponte
                isOpen = {ponteAberto}
                onClose={() => setPonteAberto(false)}
                precosPesos={precosPesosPonte}
                setPrecosPesos={setPrecosPesosPonte}
                talha={talha}
                preferencias={preferencias}
                ponteConfig={ponteConfig} 
                setPonteConfig={setPonteConfig}
            />
            {renderPagamento()}
            <div className="footer_frame_botoes">
                <button aria-label="Ponte" onClick={() => setPonteAberto(true)}>
                    Ponte
                </button>
                <button aria-label="Cliente" onClick={() => setClienteAberto(true)}>
                    Cliente
                </button>
                {user?.isAdmin && (
                    <button aria-label="Pagamento" onClick={() => handlePagamento()}>
                        Pagamento
                    </button>
                )}
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
