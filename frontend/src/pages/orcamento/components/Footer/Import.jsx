import "./Footer.css"
import React, {useState, useEffect, useRef, useContext} from 'react';
import { API_BASE_URL } from "../../../../config";
import { AuthContext } from '../../../../context/AuthContext.jsx';
import api from '../../../../services/api.js'


const validarCodigoForma = (objModelo, codigoImportado) => {
    
    if(isNaN(codigoImportado)) {
        return "O código deve conter apenas números.";
    }
    return null;
}

const validarNovaConfig = (velhaConfig, novaConfig) => {

    if (!novaConfig || typeof novaConfig !== 'object') {
        return "O código fornecido não contém um objeto de configuração válido.";
    }
    return null;
}

function Import({ isOpen, onClose, config, setConfig, setTalhaSelecionada, setCodigo, isImporting, cliente, setCliente }) {
    
    const [texto, setTexto] = useState("");
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    const inputRef = useRef(null);
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 50);
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleConfirmar();
        }
    };
    
    const handleConfirmar = async () => {
    
        try {

            const codigo = texto;

            const erroValidacaoForma = validarCodigoForma(config, codigo);
            if (erroValidacaoForma) {
                setErro(erroValidacaoForma);
                setShowErro(true);
                return;
            }

            const responseConfig = await api.get('/api/orcamentos/buscar', {
                params: { id: codigo }
            });

            const jsonConfigCliente = responseConfig.data;
            const novaConfig = jsonConfigCliente.config;

            const erroValidacaoConfig = validarNovaConfig(config, novaConfig);
            if (erroValidacaoConfig) {
                setErro(erroValidacaoConfig);
                setShowErro(true);
                return;
            }

            const clienteImportado = jsonConfigCliente.cliente;
            if (clienteImportado && clienteImportado !== "null") {
                setCliente(() => {
                    const novoCliente = { ...cliente }
                    Object.keys(cliente).forEach((key) => {
                        novoCliente[key] = "";
                    })
                    Object.keys(cliente).forEach((key) => {
                        if (clienteImportado[key] !== undefined) {
                            novoCliente[key] = clienteImportado[key];
                        }
                    })
                    return novoCliente;
                })
            } else {
                setCliente(() => {
                    const novoCliente = { ...cliente }
                    console.table(novoCliente)
                    Object.keys(cliente).forEach((key) => {
                        novoCliente[key] = "";
                    })
                    console.table(novoCliente)
                    return novoCliente;
                })
            }

            const modeloTalha = novaConfig.talhaSelecionada;
            
            const responseTalha = await api.get(`/api/talhas/${modeloTalha}`);
            const novaTalha = responseTalha.data;

            isImporting.current = true;
            setTalhaSelecionada(novaTalha);
            setConfig(novaConfig);
            setCodigo(codigo);
            setErro("");
            setShowErro(false);
            onClose();
            setTexto("");

        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 404) {
                setErro("A configuração ou talha não foi encontrada.");
            } else {
                setErro("Erro de conexão com o servidor.");
            }
            setShowErro(true);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="import">
            <div className="frame">
                <h1>Importar Configuração</h1>
                <div className="body">
                    <div>Cole o código aqui:</div>
                    <input 
                        ref={inputRef}
                        value={texto}
                        onChange={(e) => {
                            setTexto(e.target.value);
                            setShowErro(false);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Ex: 123"
                    />
                <div className={`erro ${showErro ? 'true' : ''}`}>
                    {erro}
                </div>
                </div>
                <div className="frame_botoes">
                    <button className="botao_branco" onClick={onClose}>
                        Cancelar
                    </button>
                    <button 
                        onClick={() => {handleConfirmar()}}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Import;