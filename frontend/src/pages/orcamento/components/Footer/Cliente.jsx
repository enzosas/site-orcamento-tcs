import "./Footer.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../config";

function Cliente({ isOpen, onClose, cliente, setCliente }) {

    const [isImportAberto, setImportAberto] = useState(false);


    if (!isOpen) return null;

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
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`body_cliente ${isImportAberto ? "" : "open"}`}>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>CNPJ</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Razão Social</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Inscrição Estadual</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>CEP</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label preencher">
                                <p>Endereço</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Bairro</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Cidade</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Estado</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Telefone</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="fileira">
                            <div className="input_com_label">
                                <p>Pessoa para contato</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>E-mail para contato</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                            <div className="input_com_label">
                                <p>Whatsapp</p>
                                <input 
                                    // value={texto}
                                    onChange={(e) => {
                                        // setTexto(e.target.value);
                                        // setShowErro(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="frame_botoes">
                    <div className="esq">
                        <button className="botao_branco" onClick={() => isImportAberto ? setImportAberto(false) : setImportAberto(true)}>
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
                        <button onClick={() => {handleConfirmar()}} >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cliente;