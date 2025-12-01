import "./Footer.css"
import React, {useState, useEffect} from 'react';

function Import({ isOpen, onClose, setConfig }) {

    const [texto, setTexto] = useState("");
    const[erro, setErro] = useState("");
    const[showErro, setShowErro] = useState(false);

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
                        onClick={() => {setErro("Erro!"); setShowErro(true)}}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Import;