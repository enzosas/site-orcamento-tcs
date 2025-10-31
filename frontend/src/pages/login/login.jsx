import { useState, useEffect } from "react";
import "./login.css"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

    const handleLoginSubmit = () => {
        
        if (usuario === 'admin' && senha === '123') {
            login(); 
            navigate('/');
            
        } else {
            alert('Usuário ou senha incorretos!');
            setSenha('');
        }
    };


    return (
        <div className="margem">
            <div className="header">
                <img
                    src="tcsind.png"
                    alt="TCS Indústria Metalúrgica"
                    className="header-logo"
                    style={{ maxHeight: '3rem' }}
                />
                <h1>Gerador de Orçamento</h1>
            </div>
            <div className="login__frame-branco">
                
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
                    type="button" 
                    className="botao"
                    onClick={handleLoginSubmit}
                >
                    Entrar
                </button>
                
            </div>
        </div>
        
    )
}

export default Login;
