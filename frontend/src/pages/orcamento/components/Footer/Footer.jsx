import "./Footer.css"
import React, { useState, useEffect, useRef } from 'react';
import Import from "./Import.jsx"
import { API_BASE_URL } from "../../../../config.js";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function Footer({ setTalhaSelecionada, config, setConfig }){

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
    const isImporting = useRef(false);

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

        console.table(config)
        if (isImporting.current) {
            isImporting.current = false;
        } else {
            setCodigo(null);
        }

    }, [config]);

    return (
         <div className="main-footer">
            <div className="frame-config">
                <p>Código da configuração</p>
                <div className="config--retangulo_branco">
                    <div className="config--retangulo_branco--esquerda">
                        <p>{getCodigoConfig()}</p>
                    </div>
                    <div className="config--retangulo_branco--direita">
                        <button class="botao-icone" aria-label="Copiar código" onClick={handleCopyClick} style={{ position: 'relative' }}>
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
                        <button class="botao-icone" aria-label="Importar" onClick={() => setImportAberto(true)}>
                            Importar
                        </button>
                        <button class="botao-icone" aria-label="Salvar" onClick={handleSaveClick} style={{ position: 'relative' }} disabled={codigo}>
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
            <div className="gerar-pdf">
                <p>Gerar Pdf</p>
            </div>
         </div>
        
    )
}

export default Footer;
