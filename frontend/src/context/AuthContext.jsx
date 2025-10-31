import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Você pode inicializar isso lendo um token do localStorage, por exemplo
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        // Lógica de login (ex: chamar API, salvar token)
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Lógica de logout (ex: limpar token)
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Cria um hook customizado para facilitar o uso
export const useAuth = () => {
    return useContext(AuthContext);
};