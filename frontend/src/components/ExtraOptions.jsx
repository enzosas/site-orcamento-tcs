import "./CommandPannel.css"
import React, { useState, useEffect } from "react";

function ExtraOptions({talha, config, setConfig}){
    
    useEffect(() => {
            if(config.painel6Mov){
                config.incluirSinalizadores = true;
            }
        }, [config.painel6Mov]);

    useEffect(() => {
        if (talha.celulaCargaDisponivel === false){
            setConfig(prev => ({ ...prev, celulaCarga: false }));
        }
        if (talha.fimCursoDireitaEsquerdaDisponivel === false){
            setConfig(prev => ({ ...prev, fimCursoEsquerdaDireita: false }));
        }
        if (talha.guiaCaboDisponivel === false){
            setConfig(prev => ({ ...prev, guiaCaboAco: false }));
        }
        if (talha.adaptadorVigaDisponivel === false){
            setConfig(prev => ({ ...prev, adaptadorViga: false }));
        }
	}, [talha]);
    
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
                <label className={`${talha.fimCursoDireitaEsquerdaDisponivel === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.fimCursoEsquerdaDireita}
                        disabled={talha.fimCursoDireitaEsquerdaDisponivel === false}
                        onChange={(e) => setConfig(prev => ({ ...prev, fimCursoEsquerdaDireita: e.target.checked }))}
                    />
                    Fim de Curso de Cruzeta Esquerda/Direita
                </label>
                <label className={`${talha.guiaCaboDisponivel === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.guiaCaboAco}
                        disabled={talha.guiaCaboDisponivel === false}
                        onChange={(e) => setConfig(prev => ({ ...prev, guiaCaboAco: e.target.checked }))}
                    />
                    Guia para o Cabo de Aço
                </label>
                <label className={`${talha.celulaCargaDisponivel === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.celulaCarga}
                        disabled={talha.celulaCargaDisponivel === false}
                        onChange={(e) => setConfig(prev => ({ ...prev, celulaCarga: e.target.checked }))}
                        />
                    Célula de Carga
                </label>
                <label className={`${talha.adaptadorVigaDisponivel === false ? "checkbox-item-disabled" : ""}`}>
                    <input
                        type="checkbox"
                        checked={config.adaptadorViga}
                        disabled={talha.adaptadorVigaDisponivel === false}
                        onChange={(e) => setConfig(prev => ({ ...prev, adaptadorViga: e.target.checked }))}
                    />
                    Adaptador de Viga
                </label>
            </div>
        </div>
    )
}

export default ExtraOptions;