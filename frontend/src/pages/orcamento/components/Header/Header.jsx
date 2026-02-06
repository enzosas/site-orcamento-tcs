import "./Header.css";
import React, {useState, useEffect} from 'react';
import { useAuth } from '../../../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';


function Header() {
  
    const [theme, setTheme] = useState("light");

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleSair = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = savedTheme ? savedTheme : "light";
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="header-container">
            <img
                src="tcsind.png"
                alt="TCS Indústria Metalúrgica"
                className="header-logo"
            />
            <h1 className="header-title">Gerador de Orçamento</h1>
            <svg 
                className="header-botao-tema" 
                onClick={toggleTheme}
                height="1.25em" 
                viewBox="0 -960 960 960" 
                fill="var(--corPrincipal)"
            >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm40-83q119-15 199.5-104.5T800-480q0-123-80.5-212.5T520-797v634Z"/>
            </svg>
            <div className="header-botao-sair" onClick={handleSair}>
                <p>Sair</p>
                <svg 
                    height="1.25em" 
                    viewBox="0 -960 960 960" 
                    fill="var(--corPrincipal)"
                >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
                
            </div>
        </div>
    );
}

export default Header;