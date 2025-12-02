import "./Footer.css"
import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from "../../../../config";


const validarConfigForma = (objModelo, arrayImportado) => {
    
    if(!Array.isArray(arrayImportado)) {
        return "O código não contém uma configuração válida.";
    }
    
    const chavesModelo = Object.keys(objModelo);
    
    if (arrayImportado.length !== chavesModelo.length) {
        return "A configuração importada está incompleta ou obsoleta.";
    }
    
    for (let i = 0; i < chavesModelo; i++) {
        
        const chave = chavesModelo[i];
        const valorEsperado = configModelo[chave];
        const valorRecebido = arrayImportado[i];

        if (valorEsperado !== null && typeof valorRecebido !== typeof valorEsperado) {
            return `Erro na posição ${i + 1} (${chave}): Tipo de dado inválido.`;
        }
    }
    
    return null;
}

const validarConfigLogica = async (objImportado) => {
    
    const talhaAtual = objImportado.talhaSelecionada;
    const response = await fetch(`${API_BASE_URL}/api/talhas/${talhaAtual}`);
    const data = await response.json();
}

function Import({ isOpen, onClose, config, setConfig }) {
    
    const [texto, setTexto] = useState("");
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    
    const handleConfirmar = () => {
    
        try {

            const jsonString = atob(texto);
            const arrayImportado = JSON.parse(jsonString);

            const erroValidacaoForma = validarConfigForma(config, arrayImportado);
            
            if (erroValidacaoForma) {
                setErro(erroValidacaoForma);
                showErro(true);
                return;
            }

            const chavesModelo = Object.keys(config);
            const novoObjConfig = {};
            chavesModelo.forEach((chave, index) => {
                novoObjConfig[chave] = arrayImportado[index];
            });

            const erroValidacaoLogica = validarConfigLogica(config, arrayImportado);
            if (erroValidacaoLogica) {
                setErro(erroValidacaoLogica);
                showErro(true);
                return;
            }
            
            setConfig(novoObjConfig);
            setErro("");
            setShowErro(false);
            
        } catch (e) {
            setErro("Código inválido ou corrompido.");
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
                        value={texto}
                        onChange={(e) => {
                            setTexto(e.target.value);
                            setShowErro(false);
                        }}
                        placeholder="Ex: WyIiLGZhbHNlLGZhbHNl..."
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