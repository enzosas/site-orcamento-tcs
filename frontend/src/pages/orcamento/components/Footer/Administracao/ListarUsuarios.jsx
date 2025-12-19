import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";

function ListarUsuarios( ) {

    const [usuarios, setUsuarios] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/list`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
            } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return(
            <div className="listar">
                <h1>Listar Usuários</h1>
                <p>Carregando usuários...</p>
            </div>
        );
    }

    return (
        <div className="listar">
            <h1>Listar Usuários</h1>
            <div className="table">
                <div className="header">
                        <div className="col">Usuário</div>
                        <div className="col">Senha</div>
                        <div className="col">Admin</div>
                        <div className="col">Acessos</div>
                </div>
                <div className="body">
                {usuarios && usuarios.map((user) => (
                        <div className="row" key={user.id}>
                            <div className="col">{user.username}</div>
                            <div className="col">{user.password}</div>
                            <div className="col">{user.isAdmin ? "Sim" : "Não"}</div>
                            <div className="col">{user.acessos}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListarUsuarios;