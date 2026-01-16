import "./Footer.css"
import React, { useState, useEffect, useRef, useContext } from 'react';
import Import from "./Import.jsx"
import { API_BASE_URL } from "../../../../config.js";
import Cliente from "./Cliente.jsx";
import Pdf from "./PdfViewerTela.jsx"
import Adm from "./Administracao/Administracao.jsx"
import { gerarDocx } from '../../../../utils/gerarDocx';
import { AuthContext } from '../../../../context/AuthContext.jsx'


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
    
    
    const [codigo, setCodigo] = useState(null);
    const [copiado, setCopiado] = useState(false);
    const [salvo, setSalvo] = useState(false);
    const [importAberto, setImportAberto] = useState(false);
    const [clienteAberto, setClienteAberto] = useState(false);
    const [pdfAberto, setPdfAberto] = useState(false);
    const [admAberto, setAdmAberto] = useState(false);
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
        console.log("pessoa ta completo? " + valido);
        return valido;
    }

    useEffect(() => {
        console.table(cliente);
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
        try {
            const response = await fetch(`${API_BASE_URL}/api/orcamentos/salvar`, {
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
                            <button aria-label="Copiar código" onClick={handleCopyClick} style={{ position: 'relative' }}>
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
                            <button aria-label="Importar" onClick={() => setImportAberto(true)}>
                                Importar
                            </button>
                            <button aria-label="Salvar" onClick={handleSaveClick} style={{ position: 'relative' }} disabled={codigo}>
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
            <div className="footer_frame_botoes">
                <button aria-label="Cliente" onClick={() => setClienteAberto(true)}>
                    Cliente
                </button>
                <button aria-label="Gerar Docx" onClick={() => gerarDocx(talha, config, cliente, precos, arquivo)}>
                    Gerar DOCX
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
                    <button aria-label="Admin" onClick={() => setAdmAberto(true)}>
                        Administração
                    </button>
                </div>
            )}
         </div>
        
    )
}

export default Footer;
