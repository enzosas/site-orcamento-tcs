import "./Pagamento.css"
import React, {useState, useEffect, useRef} from 'react';
import { API_BASE_URL } from "../../../../../config";

function PagamentoCliente({ isOpen, onClose, pagamento, setPagamento, gerarDocxObjetos, numeroOrcamento }) {

    if (!isOpen) return null;

    return (
        <div className="pagamento__background">
            <div className="pagamento__window">
                <p>Em breve!</p>
                <div className="pagamento__window__footer">
                    <button className="botao_branco" onClick={() => {
                        onClose();
                    }}>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PagamentoCliente;