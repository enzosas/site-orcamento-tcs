import { useState, useEffect } from "react";
import "./login.css"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

function Login() {
    
    const [usuario, setUsuario] = useState('');
    
    const [senha, setSenha] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUsuarioChange = (evento) => {
        setUsuario(evento.target.value);
    };

    const handleSenhaChange = (evento) => {
        setSenha(evento.target.value);
    };

    const handleLoginSubmit = async (evento) => {
        
        evento.preventDefault();
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usuario,
                    password: senha,
                }),
            });

            if(response.ok){

                const data = await response.json();
                login(data);
                navigate('/');

            } else {
                throw new Error('falha no login');
            }
        
        } catch (error) {
            alert('Usuário ou senha incorretos!');
            setSenha('');
        }
    };

    return (
        <div className="margem">
            <div className="headerLogin">
                <img
                    src="tcsind.png"
                    alt="TCS Indústria Metalúrgica"
                    className="header-logo"
                    style={{ maxHeight: '3rem' }}
                />
                <h1>Gerador de Orçamento</h1>
            </div>
            <form 
                className="login__frame-branco"
                onSubmit={handleLoginSubmit}
            >
                <h1>Login</h1>
                <div className="login__frame-branco__labelCampo ">
                    <label>
                        Usuário
                    </label>
                    <input 
                        type="text" 
                        value={usuario} 
                        onChange={handleUsuarioChange} 
                    />
                </div>
                <div className="login__frame-branco__labelCampo ">
                    <label>
                        Senha
                    </label>
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={handleSenhaChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="botao"
                    style={{margin: "0 auto"}}
                >
                    Entrar
                </button>
                
            </form>
        </div>
        
    )
}

export default Login;
