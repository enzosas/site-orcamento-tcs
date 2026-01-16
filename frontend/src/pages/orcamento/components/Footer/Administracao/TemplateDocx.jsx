import "../Footer.css"
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from "../../../../../config";
import templatePath from '../../../../../assets/templateOrcamento.docx'

function TemplateDocx({ arquivo, setArquivo }) {

    const inputRef = useRef(null);

    const handleBaixar = () => {
        const link = document.createElement('a');
        link.href = templatePath;
        link.setAttribute('download', 'Modelo_Orcamento.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setArquivo(file);
        }
    };

    const removerArquivo = () => {
        setArquivo(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="template">
            <h1>Template Docx</h1>
            <div className="body">
                <div className="linha">
                    <p className="titulo">Baixar template original</p>
                    <button onClick={handleBaixar} className="botao_branco download">
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
                <div className="coluna">
                    <p className="titulo">Usar template personalizado</p>
                    <div>
                        <p>Instruções de uso:</p>
                        <p>Carregue um arquivo docx. As seções entre chaves presentes no modelo original podem ser usadas no arquivo carregado e serão substituidas pelas informações na versão gerada.</p>
                    </div>
                    <div className="linha upload">
                        <input
                            type="file"
                            ref={inputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button className="botao_branco upload" onClick={handleButtonClick}>
                            <span className="material-symbols-outlined">upload</span>
                        </button>
                        {arquivo ? (
                            <div className="arquivoinfo">
                                <p className="carregado">Template carregado</p>
                                <div>
                                    <p>{arquivo.name}</p>
                                    <button className="botao_branco remover" onClick={removerArquivo}>
                                        Remover Arquivo
                                    </button>
                                </div>
                            </div>
                            
                        ) : (
                            <p className="arquivoinfo nenhum">Nenhum arquivo carregado</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateDocx;