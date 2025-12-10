import "./Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../config";

function Cliente({ isOpen, onClose, cliente, setCliente }) {

    const [isImportAberto, setImportAberto] = useState(false);
    const [cnpjImportacao, setCnpjImportacao] = useState("");
    const [textoRazaoSocial, setTextoRazaoSocial] = useState("");
    const [clienteLocal, setClienteLocal] = useState({ ...cliente });
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    const [listaResultados, setListaResultados] = useState([]); 
    const [showListaResultados, setShowListaResultados] = useState(false); 

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

    const limpaCliente = () => {
        setClienteLocal({
            cnpj: "",
            razaoSocial: "",
            inscricaoEstadual: "",
            cep: "",
            endereco: "",
            bairro: "",
            cidade: "",
            estado: "",
            telefone: "",
            pessoaContato: "",
            email: "",
            whatsapp: ""
            });
    };

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
            importarClienteCnpj(cnpjImportacao);
        } else {
            setCliente(clienteLocal);
            onClose();
        }
    };

    const importarClienteCnpj = async (cnpj) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/max/getClienteCnpj/${cnpj}`);
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
                endereco: endereco,
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

    const importarClienteRazaoSocial = async (razaoSocial) => {
        
        if (razaoSocial.length < 1) {
            setErro(`Pesquisa muito curta.`);
            setShowErro(true);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/max/getClienteRazaoSocial/${razaoSocial}`);
            const dados = await response.json();

            if (!dados || dados.length === 0) {
                setErro("Nenhum cliente encontrado com essa Razão Social.");
                setShowErro(true);
                return;
            }

            const clientesFormatados = dados.map((item) => {
                const clienteLimpo = {};
                
                Object.keys(item).forEach((key) => {
                    const valor = item[key];
                    if (valor === null || valor === undefined || valor === "null") {
                        clienteLimpo[key] = "";
                    } else {
                        clienteLimpo[key] = valor;
                    }
                });

                const endereco = [
                    clienteLimpo.logradouro,
                    clienteLimpo.enderecoNumero,
                    clienteLimpo.complemento
                ].filter(Boolean).join(", ");

                return {
                    ...clienteLimpo,
                    endereco: endereco
                };
            
            });


            if (clientesFormatados.length === 1) {
                setClienteLocal(clientesFormatados[0]);
                setImportAberto(false);
                setListaResultados([]);
            } else {
                setListaResultados(clientesFormatados);
                setShowListaResultados(true);
            }
            
            setShowErro(false);
            setErro("");

        } catch (e) {
            console.log(e);
            setErro("Erro de conexão com o servidor ou ao processar dados.");
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
                            <button className="botao_branco" onClick={() => {importarClienteCnpj(cnpjImportacao)}}>
                                Importar
                            </button>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label preencher">
                                <p>Insira a razão social para buscar</p>
                                <input 
                                    value={textoRazaoSocial}
                                    onChange={(e) => {
                                        setShowErro(false);
                                        setTextoRazaoSocial(e.target.value)
                                    }}   
                                />
                            </div>
                            <button className="botao_branco" onClick={() => {importarClienteRazaoSocial(textoRazaoSocial)}}>
                                Buscar
                            </button>
                        </div>
                        

                        
                        <div className="fileira">
                            <div
                                className={`selector-border footer ${showListaResultados ? "open" : ""}`}
                            >
                                <div className="selector footer">
                                    {listaResultados.map((item, index) => (
                                        <div
                                            key={index}
                                            className={"modelo-opcao footer"}
                                            onClick={() => {
                                                setClienteLocal(item);
                                                setShowListaResultados(false);
                                                setImportAberto(false);
                                                setListaResultados([]);
                                            }}
                                        >
                                            {item.razaoSocial}
                                        </div>
                                    ))}
                                </div>
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
                        <button className="botao_branco" onClick={limpaCliente}>
                            Limpar
                        </button>
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