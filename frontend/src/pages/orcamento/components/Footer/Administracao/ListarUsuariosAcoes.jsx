import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";

function ListarUsuariosAcoes({ user, isOpen, onUpdate }) {

    if (!user) return null;

    const handleExcluir = async () => {

        if (user.username === "admin") {
            alert("Não.")
            return;
        }

        const confirmou = window.confirm(`Tem certeza que deseja excluir o usuário "${user.username}"? Essa ação não pode ser desfeita.`);
        if (!confirmou) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/delete/${user.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir o usuário');
            }
            alert("Usuário excluído com sucesso.")
            onUpdate();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`acoes-usuario${isOpen ? "" : "--closed"}`}>
            <div className="acoes-usuario__esq">
                <p>Usuário: {user.username}</p>
                <p>ID: {user.id}</p>
            </div>
            <div className="acoes-usuario__dir">
                <button onClick={handleExcluir}>Excluir</button>
            </div>
        </div>
    );
}

export default ListarUsuariosAcoes;