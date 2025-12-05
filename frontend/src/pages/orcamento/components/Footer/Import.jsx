import "./Footer.css"
import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from "../../../../config";


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

function Import({ isOpen, onClose, config, setConfig, setTalhaSelecionada, setCodigo }) {
    
    const [texto, setTexto] = useState("");
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    
    const handleConfirmar = async () => {
    
        try {

            const codigo = texto;

            const erroValidacaoForma = validarCodigoForma(config, codigo);
            if (erroValidacaoForma) {
                setErro(erroValidacaoForma);
                setShowErro(true);
                return;
            }

            const query = new URLSearchParams();
            query.append("id", codigo);
            const responseConfig = await fetch(`${API_BASE_URL}/api/orcamentos/buscar?${query.toString()}`);
            if (!responseConfig.ok) {
                setErro(`A configuração "${codigo}" não foi encontrada no banco de dados.`);
                setShowErro(true);
                return;
            }

            const novaConfig = await responseConfig.json();

            const erroValidacaoConfig = validarNovaConfig(config, novaConfig);
            if (erroValidacaoConfig) {
                setErro(erroValidacaoConfig);
                setShowErro(true);
                return;
            }

            const modeloTalha = novaConfig.talhaSelecionada;
            
            const responseTalha = await fetch(`${API_BASE_URL}/api/talhas/${modeloTalha}`);
            if (!responseTalha.ok) {
                setErro(`O modelo de talha "${modeloTalha}" deste orçamento não existe mais no sistema.`);
                setShowErro(true);
                return;
            }

            const novaTalha = await responseTalha.json();

            setTalhaSelecionada(novaTalha);
            setConfig(novaConfig);
            setCodigo(codigo);
            setErro("");
            setShowErro(false);
            onClose();
            setTexto("");

        } catch (e) {
            console.log(e);
            setErro("Erro de conexão com o servidor.");
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