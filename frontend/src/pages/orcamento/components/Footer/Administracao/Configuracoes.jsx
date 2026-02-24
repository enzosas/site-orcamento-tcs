import "../Footer.css"
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from "../../../../../config";
import templatePath from '../../../../../assets/templateOrcamento.docx'


function Configuracoes({ preferencias, setPreferencias }) {

    return (
        <div>
            <h1>Configurações</h1>
            <div className="body">
                <div className="linha">
                    <label>
                        <input
                            type="checkbox"
                            checked={preferencias.mostrarLogs}
                            onChange={(e) => setPreferencias({mostrarLogs: e.target.checked})}
                        />
                        Exibir logs do cálculo do orçamento (aperte F12 para ver)
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Configuracoes;