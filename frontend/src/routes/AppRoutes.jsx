// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/login/login';
import Home from '../pages/orcamento/App';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;