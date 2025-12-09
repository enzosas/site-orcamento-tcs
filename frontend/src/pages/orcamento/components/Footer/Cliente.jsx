import "./Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../config";

function Cliente({ isOpen, onClose, cliente, setCliente }) {

    const [isImportAberto, setImportAberto] = useState(false);
    const [cnpjImportacao, setCnpjImportacao] = useState("");
    const [clienteLocal, setClienteLocal] = useState({ ...cliente });
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setClienteLocal({ ...cliente });
        }
    }, [isOpen, cliente]);

    const mascaraCNPJ = (valor) => {
        if (!valor) return "";
        
        const v = valor.replace(/\D/g, "");
        
        return v
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .substring(0, 18);
    };

    const limpaCNPJ = (cnpj) => {
        let cpnjFinal = cnpj.replace(/\D/g, "");
        if (cpnjFinal.length > 14) {
                cpnjFinal = cpnjFinal.slice(0, 14);
        }
        return cpnjFinal;
    }

    const mascaraCEP = (valor) => {
        if (!valor) return "";
        
        const v = valor.replace(/\D/g, "");
        
        return v
            .replace(/^(\d{5})(\d)/, "$1-$2")
            .substring(0, 9);
    };

    const limpaCEP = (cep) => {
        let cepFinal = cep.replace(/\D/g, "");
        
        if (cepFinal.length > 8) {
            cepFinal = cepFinal.slice(0, 8);
        }
        return cepFinal;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let valorFinal = value;

        if (name === "cnpj") {
            valorFinal = limpaCNPJ(value);
        }
        if (name === "cep") {
            valorFinal = limpaCEP(value);
        }
        setClienteLocal(prevCliente => ({
            ...prevCliente,
            [name]: valorFinal
        }));
    };

    const handleConfirmar = () => {
        if (isImportAberto) {
            importarCliente(cnpjImportacao);
        } else {
            setCliente(clienteLocal);
            onClose();
        }
    };

    const importarCliente = async (cnpj) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/max/getCliente/${cnpj}`);
            if (!response.ok) {
                setErro(`O cnpj ${cnpj} não existe no sistema.`);
                setShowErro(true);
                return;
            }

            const novoCliente = await response.json();

            Object.keys(novoCliente).forEach((key) => {
                const valor = novoCliente[key];
                
                if (valor === null || valor === undefined || valor === "null") {
                    novoCliente[key] = "";
                } else {
                    novoCliente[key] = valor;
                }
            });

            const endereco = [
                novoCliente.logradouro,
                novoCliente.enderecoNumero,
                novoCliente.complemento
            ].filter(Boolean).join(", ");

            setClienteLocal(() => ({
                ...novoCliente,
                endereco: endereco
            }));
            setImportAberto(false);
            setShowErro(false);
            setErro("");

        } catch (e) {
            console.log(e);
            setErro("Erro de conexão com o servidor.");
            setShowErro(true);
        }
    }

    if (!isOpen) return null;

    // ao colocar elementos aqui, alterar altura maxima no css!
    return (
        <div className="cliente">
            <div className="frame">
                <h1>Cliente</h1>
                <div className="body">
                    <div className={`body_import ${ isImportAberto ? "open" : ""}`}>
                        <div className="fileira">
                            <div className="input_com_label preencher">
                                <p>Insira o CNPJ para importar os dados do cliente</p>
                                <input 
                                    value={(mascaraCNPJ(cnpjImportacao || ""))}
                                    onChange={(e) => {
                                        setShowErro(false);
                                        setCnpjImportacao(limpaCNPJ(e.target.value))}
                                    }   
                                />
                            </div>
                        </div>
                        <div className={`erro ${showErro ? 'true' : ''}`}>
                            {erro}
                        </div>
                    </div>
                    <div className={`body_cliente ${isImportAberto ? "" : "open"}`}>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>CNPJ</p>
                                <input 
                                    name="cnpj"
                                    value={mascaraCNPJ(clienteLocal.cnpj || "")}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Razão Social</p>
                                <input 
                                    name="razaoSocial"
                                    value={clienteLocal.razaoSocial || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Inscrição Estadual</p>
                                <input 
                                    name="inscricaoEstadual" 
                                    value={clienteLocal.inscricaoEstadual || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>CEP</p>
                                <input 
                                    name="cep" 
                                    value={mascaraCEP(clienteLocal.cep || "")} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label preencher">
                                <p>Endereço</p>
                                <input 
                                    name="endereco" 
                                    value={clienteLocal.endereco || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Bairro</p>
                                <input 
                                    name="bairro" 
                                    value={clienteLocal.bairro || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Cidade</p>
                                <input 
                                    name="cidade" 
                                    value={clienteLocal.cidade || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Estado</p>
                                <input 
                                    name="estado" 
                                    value={clienteLocal.estado || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Telefone</p>
                                <input 
                                    name="telefone" 
                                    value={clienteLocal.telefone || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Pessoa para contato</p>
                                <input 
                                    name="pessoaContato" 
                                    value={clienteLocal.pessoaContato || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>E-mail para contato</p>
                                <input 
                                    name="email"
                                    value={clienteLocal.email || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Whatsapp</p>
                                <input 
                                    name="whatsapp" 
                                    value={clienteLocal.whatsapp || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="frame_botoes">
                    <div className="esq">
                        <button className="botao_branco" onClick={() => setImportAberto(!isImportAberto)}>
                            {isImportAberto ? "Voltar" : "Importar"}
                        </button>
                    </div>
                    <div className="dir">
                        <button className="botao_branco" onClick={() => {
                            setImportAberto(false);
                            onClose();
                        }}>
                            Cancelar
                        </button>
                        <button onClick={handleConfirmar}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cliente;