import "./Header.css";
import React, {useState, useEffect} from 'react';


function Header() {
  
    const [theme, setTheme] = useState("light");

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
        </div>
    );
}

export default Header;