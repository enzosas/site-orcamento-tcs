import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import ListarUsuariosAcoes from "./ListarUsuariosAcoes";

function ListarUsuarios( ) {

    const [usuarios, setUsuarios] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [selecionado, setSelecionado] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleSelecionar = (user) => {
        if(!selecionado || user.id !== selecionado.id){
            setSelecionado(user);
        } else {
            setSelecionado(null);
        }
    }

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
            <p>Clique em um usuário para ver as ações.</p>
            <div className="table">
                <div className="header">
                        <div className="col">Usuário</div>
                        <div className="col">Senha</div>
                        <div className="col">Admin</div>
                        <div className="col">Acessos</div>
                </div>
                <div className="body">
                {usuarios && usuarios.map((user, index) => (
                        <div 
                            className={`row ${selecionado?.id === user.id ? "selecionado" : ""}`} 
                            key={user.id}
                            onClick={() => handleSelecionar(user)}
                        >
                            <div className="col">{user.username}</div>
                            <div className="col">{user.username !== "admin" ? user.password : ""}</div>
                            <div className="col">{user.isAdmin ? "Sim" : "Não"}</div>
                            <div className="col">{user.acessos}</div>
                        </div>
                    ))}
                </div>
            </div>
            <ListarUsuariosAcoes 
                user={selecionado} 
                isOpen={selecionado}
                onUpdate={() => {
                    fetchUsuarios();
                    setSelecionado(null);
                }}
            />
        </div>
    );
}

export default ListarUsuarios;