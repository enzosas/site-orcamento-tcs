import "./Footer.css"
import React, { useState, useEffect } from 'react';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function Footer({ talha, config }){

    function getCodigoConfig(){

        const valoresArray = Object.values(config);
        const jsonString = JSON.stringify(valoresArray);
        const codigo = btoa(jsonString)
        return codigo;
    }
    
    const [codigo, setCodigo] = useState(null);
    const [copiado, setCopiado] = useState(false);

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


    useEffect(() => {

        setCodigo(getCodigoConfig());

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
                         <button class="botao-icone" aria-label="Importar">
                            Importar
                        </button>
                    </div>
                </div>
            </div>
            <div className="gerar-pdf">
                <p>Gerar Pdf</p>
            </div>
         </div>
        
    )
}

export default Footer;
