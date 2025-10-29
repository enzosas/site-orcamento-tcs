import { useState, useEffect } from "react";
import "./login.css"

function Login() {
    
    const [usuario, setUsuario] = useState('');
    
    const [senha, setSenha] = useState('');

    const handleUsuarioChange = (evento) => {
        setUsuario(evento.target.value);
    };

    const handleSenhaChange = (evento) => {
        setSenha(evento.target.value);
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
                        type="text" 
                        value={senha} 
                        onChange={handleSenhaChange} 
                    />
                </div>
                <button type="button" className="botao">
                    Entrar
                </button>
                
            </div>
        </div>
        
    )
}

export default Login;
