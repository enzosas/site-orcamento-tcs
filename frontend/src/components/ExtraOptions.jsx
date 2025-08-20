import "./CommandPannel.css"

function ExtraOptions({config, setConfig}){
    return (
        <div>
            <div className="frame-branco frame-checkbox-extra">
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