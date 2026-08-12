import "./ModelSelector.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { fixConfig, getOpcoesPotencia, getOpcoesControle, getOpcoesTensao } from "../../../../utils/regrasConfig.js"
import api from '../../../../services/api.js'


function ModelSelector({ setTalhaSelecionada, talha, config, setConfig, preferencias }){

    const jaCarregouPrimeiraTalhaInit = useRef(false);

    const [filtros, setFiltros] = useState({
        correnteCabo: "",
        capacidade: "",
        tipoTrole: "",
        cursoUtilGancho: ""
    });
    
    let opcoesTensao = talha ? getOpcoesTensao(talha) : [];
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        const fetchAllTalhas = async () => {
            try {
                const response = await api.get("/api/max/getAllTalhas");
                setModelos(response.data);
            } catch (error) {
                console.error("Erro ao buscar os modelos:", error);
            }
        };

        fetchAllTalhas();
    }, []);

    useEffect( () => {
        if(modelos.length > 0 && !jaCarregouPrimeiraTalhaInit.current) {
            handleSelecaoManual(modelos[0]);
            jaCarregouPrimeiraTalhaInit.current = true;
        }
    }, [modelos]);

    const atualizarConfig = (alteracoesParciais) => {
        setConfig((prevConfig) => {
            const configProvisoria = { ...prevConfig, ...alteracoesParciais };
            return fixConfig(configProvisoria, talha)
        });
    };

    const handleSelecaoManual = (novaTalha) => {
        setTalhaSelecionada(novaTalha);
        if (preferencias.mostrarLogTalhaSelecionada) {
            console.log(novaTalha);
        }
        opcoesTensao = getOpcoesTensao(novaTalha);
        setConfig(prev => {
            const resetarValores = {
                excluirPainel: false,
                painel6Mov: false,
                controleRemoto: false,
                duplaVelocidadeElevacao: false,
                duplaVelocidadeTranslacao: false,
                transmissorExtra: false,
                potenciaMotores: "",
                modeloControle: "",
                tensao: "",
                incluirSinalizadores: false,
                fimCursoEsquerdaDireita: false,
                guiaCaboAco: false,
                celulaCarga: false,
                adaptadorViga: false
            };
            const configBase = {
                ...prev,
                ...resetarValores,
                talhaSelecionada: novaTalha.modelo,
                tensao: opcoesTensao[0]
            };
            return fixConfig(configBase, novaTalha);
        });
    };

    const modelosFiltrados = useMemo(() => {
        const filtrados = modelos.filter(t => {
            const bateCorrente = !filtros.correnteCabo || t.correnteCabo === filtros.correnteCabo;
            const bateCapacidade = !filtros.capacidade || String(t.capacidade) === filtros.capacidade;
            const bateTrole = !filtros.tipoTrole || t.tipoTrole === filtros.tipoTrole;
            const bateCurso = !filtros.cursoUtilGancho || String(t.cursoUtilGancho) === filtros.cursoUtilGancho;

            return bateCorrente && bateCapacidade && bateTrole && bateCurso;
        });

        return filtrados.sort((a, b) => {
            const capA = a.capacidade || 99999;
            const capB = b.capacidade || 99999;

            return capA - capB; 
        });

    }, [modelos, filtros]);

    const podeAlterarTensao = talha?.tensaoTrifasica === "220/380V Trifásico";

    return (
        <div>
            <div className="frame-branco">
                <div className="modelselector-corpo">
                    <div className="modelselector-corpo-left">
                        <h2 className="frame-branco-title">Escolha o modelo:</h2>
                        <ModelSelectorList modelos={modelosFiltrados} onSelect={handleSelecaoManual} talhaAtiva={talha} />
                    </div>
                    <div className="modelselector-corpo-left">
                        <h2 className="frame-branco-title">Filtros</h2>
                        <ModelSelectorFilter filtros={filtros} setFiltros={setFiltros} modelos={modelos} />
                    </div>
                </div>
                {talha && (
                        <div className="frame-unidade-caixa-selecao">
                            <h4 className={`headerSelect ${!podeAlterarTensao ? "disabled" : ""}`}>Tensão</h4>
                            <select
                                name="opcoesTensao" 
                                disabled={!podeAlterarTensao}
                                value={config.tensao}
                                onChange={(e) => atualizarConfig({tensao: e.target.value })}
                            >
                                {opcoesTensao.map((opcao, i) => (
                                    <option key={i} value={opcao}>{opcao}</option>
                                ))}
                            </select>
                        </div>
                )}
            </div>
        </div>
    )
}

export default ModelSelector;