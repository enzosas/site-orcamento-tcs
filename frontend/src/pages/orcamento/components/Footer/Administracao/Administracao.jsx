import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import RegistrarUsuario from "./RegistrarUsuario"
import ListarUsuarios from "./ListarUsuarios"
import TemplateDocx from "./TemplateDocx";
import Configuracoes from "./Configuracoes";

function Administracao({ isOpen, onClose, arquivo, setArquivo, preferencias, setPreferencias }) {

    const [view, setView] = useState('listar');

    const renderMainContent = () => {
        switch (view) {
            case 'listar':
                return <ListarUsuarios />;
            case 'registrar':
                return <RegistrarUsuario />;
            case 'template':
                return <TemplateDocx arquivo={arquivo} setArquivo={setArquivo} />;
            case 'configuracoes':
                return <Configuracoes preferencias={preferencias} setPreferencias={setPreferencias} />;
            default:
                return <ListarUsuarios />;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="adm">
            <div className="frame">
                <div className="menu">
                <h1>Administração</h1>
                    <button 
                        className={`botao_branco ${view === 'listar' ? 'active' : ''}`} 
                        onClick={() => setView('listar')}
                    >
                        Listar Usuários
                    </button>
                    <button 
                        className={`botao_branco ${view === 'registrar' ? 'active' : ''}`} 
                        onClick={() => setView('registrar')}
                    >
                        Registrar Usuário
                    </button>
                    <button 
                        className={`botao_branco ${view === 'template' ? 'active' : ''}`} 
                        onClick={() => setView('template')}
                    >
                        Template DOCX
                    </button>
                    <button 
                        className={`botao_branco ${view === 'configuracoes' ? 'active' : ''}`} 
                        onClick={() => setView('configuracoes')}
                    >
                        Configurações
                    </button>
                </div>
                <div className="direita">
                     <div className="main">
                        {renderMainContent()}
                    </div>
                    <div className="embaixo">
                        <button className="botao_branco" onClick={() => {
                            onClose();
                        }}>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Administracao;