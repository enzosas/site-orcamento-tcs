import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import api from '../../../../../services/api.js'

function ListarUsuariosAcoes({ user, isOpen, onUpdate }) {

    const handleExcluir = async () => {

        const token = localStorage.getItem('token');
        if (!user) return;

        if (user.username === "admin") {
            alert("Não.")
            return;
        }

        const confirmou = window.confirm(`Tem certeza que deseja excluir o usuário "${user.username}"? Essa ação não pode ser desfeita.`);
        if (!confirmou) return;

        try {
            const response = await api.delete(`/api/auth/delete/${user.id}`);
            alert("Usuário excluído com sucesso.")
            onUpdate();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`acoes-usuario ${isOpen ? "" : "acoes-usuario--closed"}`}>
            <div className="acoes-usuario__esq">
                <p>Usuário: {user?.username}</p>
                <p>ID: {user?.id}</p>
            </div>
            <div className="acoes-usuario__dir">
                <button onClick={handleExcluir}>Excluir</button>
            </div>
        </div>
    );
}

export default ListarUsuariosAcoes;