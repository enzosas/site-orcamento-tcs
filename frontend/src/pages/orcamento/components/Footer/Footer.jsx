import "./Footer.css"
import React, { useState, useEffect } from 'react';

function Footer({ talha, config }){

    function getCodigoConfig(){

        const valoresArray = Object.values(config);
        const jsonString = JSON.stringify(valoresArray);
        const codigo = btoa(jsonString)
        return codigo;
    }
    
    const [codigo, setCodigo] = useState(null);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(codigo)
        .then(() => {
            alert("Código copiado!"); 
        })
        .catch(err => {
            console.error('Falha ao copiar o texto: ', err);
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
                        <button class="botao-icone" aria-label="Copiar código" onClick={handleCopyClick}>
                            Copiar
                        </button>
                         <button class="botao-icone" aria-label="Copiar código">
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
