import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (dadosUsuario) => {
        setUser(dadosUsuario);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user,
            login, 
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};