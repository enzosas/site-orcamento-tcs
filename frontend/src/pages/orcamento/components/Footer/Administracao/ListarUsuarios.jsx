import "../Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";
import ListarUsuariosAcoes from "./ListarUsuariosAcoes";
import api from '../../../../../services/api.js'

function ListarUsuarios( ) {

    const [usuarios, setUsuarios] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [selecionado, setSelecionado] = useState(null);
    const [orcamentosContagem, setOrcamentosContagem] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            setCarregando(true);
            await Promise.all([fetchUsuarios(), fetchNumeroOrcamentos()]);
            setCarregando(false);
        };
        carregarDadosIniciais();
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
            const response = await api.get(`/api/auth/list`);
            setUsuarios(response.data);
        } catch (error) {
            console.error(error);
            } finally {
            setCarregando(false);
        }
    }

    const fetchNumeroOrcamentos = async () => {
        try {
            const response = await api.get('/api/auth/orcamentos');
            setOrcamentosContagem(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const obterTotalOrcamentos = (username) => {
        const registro = orcamentosContagem.find(item => item.username === username);
        return registro ? registro.total : 0;
    };

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
                        <div className="col">Admin</div>
                        <div className="col">Acessos</div>
                        <div className="col">Orçamentos criados</div>
                </div>
                <div className="body">
                {usuarios && usuarios.map((user, index) => (
                        <div 
                            className={`row ${selecionado?.id === user.id ? "selecionado" : ""}`} 
                            key={user.id}
                            onClick={() => handleSelecionar(user)}
                        >
                            <div className="col">{user.username}</div>
                            <div className="col">{user.isAdmin ? "Sim" : "Não"}</div>
                            <div className="col">{user.acessos}</div>
                            <div className="col">{obterTotalOrcamentos(user.username)}</div>
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