// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza o conteúdo da rota (ex: a Home)
    return <Outlet />;
};

export default PrivateRoute;