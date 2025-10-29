import { useState, useEffect } from "react";
import "./login.css"

function Login() {
    
    const [usuario, setUsuario] = useState('');
    
    const [senha, setSenha] = useState('');

    const handleInputChange = (evento) => {
        setNome(evento.target.value);
    };


    return (
        <div className="login__frame-branco">
            <h1>Login</h1>
            
            <div className="login__frame-branco__labelCampo">
            <label>
                Nome
            </label>
                <input 
                    type="text" 
                    value={usuario} 
                    onChange={handleInputChange} 
                />
            </div>
            
        </div>
    )
}

export default Login;
