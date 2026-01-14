import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import { all } from "axios";

function RegistrarUsuario( ) {

    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    const [textoUsuario, setTextoUsuario] = useState("");
    const [textoSenha, setTextoSenha] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [salvo, setSalvo] = useState(false);
    
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
            const allUsersResponse = await fetch(`${API_BASE_URL}/api/auth/list`);
            if (!allUsersResponse.ok) {
                const errorBody = await allUsersResponse.text();
                setErro(errorBody);
                setShowErro(true);
                throw new Error(`Erro ao verificar disponibilidade do usuário.`);
            }
            const allUsers = await allUsersResponse.json();
            
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

            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro na requisição: ${response.status} - [Backend: ${errorBody}]`);
            }
            setSalvo(true);
            alert(`Usuário registrado com sucesso!`)
        } catch (error) {

            if (error.name !== 'AbortError') {
                console.error(`Falha ao registrar o usuário:`, error);
            }
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