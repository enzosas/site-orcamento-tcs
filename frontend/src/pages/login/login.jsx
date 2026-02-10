import { useState, useEffect } from "react";
import "./login.css"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config";
import api from '../../services/api';

function Login() {
    
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [showCarregando, setShowCarregando] = useState(false);

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
        setShowCarregando(true);
        
        try {
            const response = await api.post('/api/auth/login', {
                username: usuario,
                password: senha
            });

            login(response.data); 
            navigate('/');
        
        } catch (error) {
            alert('Usuário ou senha incorretos!');
            setSenha('');
            setShowCarregando(false);
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
                <div className="login__frame-branco__labelCampo">
                    <label>
                        Usuário
                    </label>
                    <input 
                        type="text" 
                        value={usuario} 
                        onChange={handleUsuarioChange} 
                    />
                </div>
                <div className="login__frame-branco__labelCampo">
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
                    className={`login__frame-branco__botaologin ${showCarregando ? 'login__frame-branco__botaologin--hide' : ''}`}
                >
                    Entrar
                </button>
                <div className={`login__carregando ${showCarregando ? "" : "login__carregando--hide"}`}>
                    <span className="login__carregando__loader"></span>
                    <p>Carregando, pode levar alguns segundos.</p>
                </div>
            </form>
        </div>
        
    )
}

export default Login;
