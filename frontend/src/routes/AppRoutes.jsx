// src/routes/AppRoutes.js
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/login/login';
import Home from '../pages/orcamento/App';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </HashRouter>
    );
};

export default AppRoutes;