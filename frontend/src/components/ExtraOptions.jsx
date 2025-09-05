import "./CommandPannel.css"
import React, { useState, useEffect } from "react";

function ExtraOptions({config, setConfig}){
    
    useEffect(() => {
            if(config.painel6Mov){
                config.incluirSinalizadores = true;
            }
        }, [config.painel6Mov]);
    
    return (
        <div>
            <div className="frame-branco frame-checkbox-extra">
                <label >
                    <input
                        type="checkbox"
                        checked={config.incluirSinalizadores}
                        disabled={config.painel6Mov}
                        onChange={(e) => setConfig(prev => ({ ...prev, incluirSinalizadores: e.target.checked }))}
                    />
                    Incluir Sinalizadores Sonoro e Luminoso
                </label>
                <label >
                    <input
                        type="checkbox"
                        checked={config.fimCursoEsquerdaDireita}
                        onChange={(e) => setConfig(prev => ({ ...prev, fimCursoEsquerdaDireita: e.target.checked }))}
                    />
                    Fim de Curso de Cruzeta Esquerda/Direita
                </label>
                <label >
                    <input
                        type="checkbox"
                        checked={config.guiaCaboAco}
                        onChange={(e) => setConfig(prev => ({ ...prev, guiaCaboAco: e.target.checked }))}
                    />
                    Guia para o Cabo de Aço
                </label>
                <label >
                    <input
                        type="checkbox"
                        checked={config.celulaCarga}
                        onChange={(e) => setConfig(prev => ({ ...prev, celulaCarga: e.target.checked }))}
                    />
                    Célula de Carga
                </label>
                <label >
                    <input
                        type="checkbox"
                        checked={config.adaptadorViga}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptadorViga: e.target.checked }))}
                    />
                    Adaptador de Viga
                </label>
            </div>
        </div>
    )
}

export default ExtraOptions;