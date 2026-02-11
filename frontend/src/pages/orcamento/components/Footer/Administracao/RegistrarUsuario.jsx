import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import api from '../../../../../services/api.js'

function RegistrarUsuario( ) {

    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    const [textoUsuario, setTextoUsuario] = useState("");
    const [textoSenha, setTextoSenha] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [salvo, setSalvo] = useState(false);
    const token = localStorage.getItem('token');
    
    const handleRegisterClick = async () => {
        
        if (salvo) {
            return;
        }
        const user = {
            username: textoUsuario,
            password: textoSenha,
            isAdmin: isAdmin
        }
        if (textoUsuario.length < 3) {
            setErro(`Usuário muito curto.`);
            setShowErro(true);
            return;
        }  
        if (textoSenha.length < 3) {
            setErro(`Senha muito curta.`);
            setShowErro(true);
            return;
        }  
        try {
            const allUsersResponse = await api.get(`/api/auth/list`);
            const allUsers = allUsersResponse.data;
            
            let usuarioJaExiste = false;

            allUsers.map((item) => {
                if (item.username === textoUsuario) {
                    usuarioJaExiste = true;
                }
            })

            if (usuarioJaExiste) {
                setErro("Usuário já existe");
                setShowErro(true);
                return
            }

            await api.post(`/api/auth/register`, user);
            setSalvo(true);
            alert(`Usuário registrado com sucesso!`)
        } catch (error) {
            const errorBody = error.response.data;
            setErro(`Falha ao registrar o usuário`);
            setShowErro(true);
            console.error(`Falha ao registrar o usuário:`, error);
            throw error;
        }
    };

    return (
            <div className="registrar">
                <h1>Registrar Usuário</h1>
                <div className="body">
                    <div className="input_com_label">
                        <p>Usuário</p>
                        <input 
                            value={textoUsuario}
                            onChange={(e) => {
                                setTextoUsuario(e.target.value);
                                setShowErro(false);
                                setSalvo(false);
                            }}
                        />
                    </div>
                    <div className="input_com_label">
                        <p>Senha</p>
                        <input 
                            value={textoSenha}
                            onChange={(e) => {
                                setTextoSenha(e.target.value);
                                setShowErro(false);
                                setSalvo(false);
                            }}
                        />
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        Administrador
                    </label>
                    <button onClick={handleRegisterClick} disabled={salvo}>
                        Registrar
                    </button>

                <div className={`erro ${showErro ? 'true' : ''}`}>
                    {erro}
                </div>
                </div>
            </div>
    );
}

export default RegistrarUsuario;