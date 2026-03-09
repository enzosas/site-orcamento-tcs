import "./Ponte.css"
import React, {useState, useEffect, useRef, useContext} from 'react';
import { API_BASE_URL } from "../../../../../config";
import { AuthContext } from '../../../../../context/AuthContext.jsx'
import api from '../../../../../services/api.js'

function Ponte({ isOpen, onClose }) {

    if (!isOpen) return null;

    const opcoesFormaConstrutiva = [
        "Univiga - Tipo Caixão",
        "Univiga - Perfil W",
        "Dupla Viga - Tipo Caixão"
    ];

    const opcoesCapacidade = [
        "100",
        "200",
        "250",
        "500",
        "1.000",
        "1.500",
        "2.000",
        "3.000",
        "3.200",
        "5.000",
        "6.000",
        "6.300",
        "8.000",
    ];

    const opcoesEletrificacaoTransversal = [
        "Esteira porta cabo",
        "Cabo Chato",
        "Inexistente"
    ];

    const opcoesEletrificacaoLongitudinal = [
        "Opcional",
        "Barramento Blindado - 1 consumidor",
        "Barramento Blindado - 2 consumidores",
        "Barramento Blindado - 3 consumidores",
        "Barramento Blindado - 4 consumidores",
        "Somente o Carro coletor",
        "Fornecido pelo Cliente",
        "Inexistente"
    ];

    const opcoesTipoCaminhoRolamento = [
        "Viga Metálica + Trilho",
        "Somente Trilho",
        "Trilho + Chumbador"
    ];

    const opcoesBitolaTrilho = [
        "QD.32 mm",
        "QD.38 mm",
        "QD.44 mm",
        "QD.51 mm",
        "TR-25",
        "TR-32",
        "TR-37",
        "ASCE 25"
    ];

    const opcoesDimensoes = [
        "Sem coluna",
        "100 x 100 x 4,75",
        "100 x 100 x 6,35",
        "127 x 127 x 4,75",
        "127 x 127 x 6,35",
        "150 x 150 x 4,75",
        "150 x 150 x 6,35",
        "175 x 175 x 6,35",
        "200 x 200 x 6,35",
        "250 x 250 x 6,35",
        "300 x 300 x 6,35",
        "300 x 300 x 8,00"
    ];

    const [ponteConfig, setPonteConfig] = useState({
        dadosBasicos_isPonte: true,
        dadosBasicos_formaConstrutiva: opcoesFormaConstrutiva[0],
        dadosBasicos_capacidade: opcoesCapacidade[0],
        dadosBasicos_vaoLivre: 0,
        dadosBasicos_isCaminhoRolamento: false,
        dadosBasicos_isColunasSustentacao: false,
        dadosBasicos_isAntiColisao: false,
        dadosBasicos_comprimento: 0,
        dadosBasicos_eletrificacaoTransversal: opcoesEletrificacaoTransversal[0],
        dadosBasicos_eletrificacaoLongitudinal: opcoesEletrificacaoLongitudinal[0],
        caminhoRolamento_tipo: opcoesTipoCaminhoRolamento[0],
        caminhoRolamento_bitolaTrilho: opcoesBitolaTrilho[0],
        caminhoRolamento_ladoA_distanciaApoios: 0,
        caminhoRolamento_ladoA_perfilMetalico: "",
        caminhoRolamento_ladoB_distanciaApoios: 0,
        caminhoRolamento_ladoB_perfilMetalico: "",
        colunasSustentacao_distribuicaoIs2Lados: true,
        colunasSustentacao_ladoA_altura: 0,
        colunasSustentacao_ladoA_dimensoes: opcoesDimensoes[0],
        colunasSustentacao_ladoA_numeroColunas: 0,
        colunasSustentacao_ladoB_altura: 0,
        colunasSustentacao_ladoB_dimensoes: opcoesDimensoes[0],
        colunasSustentacao_ladoB_numeroColunas: 0
    });

    const desativo = {
        caminhoRolamento_tudo: !ponteConfig.dadosBasicos_isCaminhoRolamento,
        caminhoRolamento_lados: ponteConfig.caminhoRolamento_tipo !== "Viga Metálica + Trilho",
        colunasSustentacao_tudo: !ponteConfig.dadosBasicos_isColunasSustentacao,
        colunasSustentacao_ladoB: ponteConfig.colunasSustentacao_distribuicaoIs2Lados !== "Nos 2 lados",
    };

    console.table(desativo)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let val = value;

        if (type === 'checkbox') {
            val = checked;
        } else if (type === 'radio'){
            val = value === 'true';
        }
        console.log(e)
        setPonteConfig(prev => ({
            ...prev,
            [name]: val
        }));
    };

    return (
        <div className="ponte__background">
            <div className="ponte__window">
                <div className="ponte__body">
                    <div className="ponte__body__coluna">
                        <div className="ponte__body__caixa_sombra ponte__body__caixa_sombra--scroll">
                            <h1>Dados Básicos</h1>
                            <div className="ponte__body__coluna__fileira_horizontal">
                                <label>
                                    {console.log(ponteConfig)}
                                    <input
                                        type="radio"
                                        value="true"
                                        name="dadosBasicos_isPonte"
                                        onChange={handleChange}
                                        checked={ponteConfig.dadosBasicos_isPonte}
                                    />
                                    Ponte Rolante
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="false"
                                        name="dadosBasicos_isPonte"
                                        onChange={handleChange}
                                        checked={!ponteConfig.dadosBasicos_isPonte}
                                    />
                                    Pórtico Rolante
                                </label>
                            </div>
                            <div className="ponte__window__input">
                                <h4>Forma Construtiva</h4>
                                <select
                                    value={ponteConfig.dadosBasicos_formaConstrutiva}
                                    name="dadosBasicos_formaConstrutiva"
                                    onChange={handleChange}
                                >
                                    {opcoesFormaConstrutiva.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}

                                </select>
                            </div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ponteConfig.dadosBasicos_isCaminhoRolamento}
                                    name="dadosBasicos_isCaminhoRolamento"
                                    onChange={handleChange}
                                />
                                Caminho de Rolamento
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ponteConfig.dadosBasicos_isColunasSustentacao}
                                    name="dadosBasicos_isColunasSustentacao"
                                    onChange={handleChange}
                                />
                                Colunas de Sustentação
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ponteConfig.dadosBasicos_isAntiColisao}
                                    name="dadosBasicos_isAntiColisao"
                                    onChange={handleChange}
                                />
                                Anti Colisão
                            </label>
                            <div className="ponte__window__input">
                                <h4>Capacidade</h4>
                                <select
                                    value={ponteConfig.dadosBasicos_capacidade}
                                    name="dadosBasicos_capacidade"
                                    onChange={handleChange}
                                >
                                    {opcoesCapacidade.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ponte__window__input">
                                <h4>Eletrificação Transversal</h4>
                                <select
                                    value={ponteConfig.dadosBasicos_eletrificacaoTransversal}
                                    name="dadosBasicos_eletrificacaoTransversal"
                                    onChange={handleChange}
                                >
                                    {opcoesEletrificacaoTransversal.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ponte__window__input">
                                <h4>Eletrificação Longitudinal Barramento Blindado</h4>
                                <select
                                    value={ponteConfig.dadosBasicos_eletrificacaoLongitudinal}
                                    name="dadosBasicos_eletrificacaoLongitudinal"
                                    onChange={handleChange}
                                >
                                    {opcoesEletrificacaoLongitudinal.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ponte__window__input">
                                <h4>Vão Livre</h4>
                                <input
                                    className="ponte__window__input"
                                    type="number"
                                    value={ponteConfig.dadosBasicos_vaoLivre}
                                    name="dadosBasicos_vaoLivre"
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                            <div className="ponte__window__input">
                                <h4 className={`${desativo.caminhoRolamento_tudo ? "ponte__disabled_color" : ""}`}>Comprimento</h4>
                                <input
                                    className={`ponte__window__input ${desativo.caminhoRolamento_tudo ? "ponte__window__input--disabled" : ""}`}
                                    type="number"
                                    value={ponteConfig.dadosBasicos_comprimento}
                                    name="dadosBasicos_comprimento"
                                    onChange={handleChange}
                                    disabled={desativo.caminhoRolamento_tudo}
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="ponte__body__coluna">
                        <div className="ponte__body__caixa_sombra ponte__body__caixa_sombra--scroll">
                            <h2 className={`${desativo.caminhoRolamento_tudo ? "ponte__disabled_color" : ""}`}>
                                Caminho Rolamento
                            </h2>
                            <div className="ponte__body__coluna__fileira_horizontal">
                                <div className={`ponte__window__input ${desativo.caminhoRolamento_tudo ? "ponte__window__input--disabled" : ""}`}>
                                    <h4>Tipo</h4>
                                    <select
                                        value={ponteConfig.caminhoRolamento_tipo}
                                        name="caminhoRolamento_tipo"
                                        onChange={handleChange}
                                        disabled={desativo.caminhoRolamento_tudo}
                                    >
                                        {opcoesTipoCaminhoRolamento.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={`ponte__window__input ${desativo.caminhoRolamento_tudo ? "ponte__window__input--disabled" : ""}`}>
                                    <h4>Bitola Trilho</h4>
                                    <select
                                        value={ponteConfig.caminhoRolamento_bitolaTrilho}
                                        name="caminhoRolamento_bitolaTrilho"
                                        onChange={handleChange}
                                        disabled={desativo.caminhoRolamento_tudo}
                                    >
                                        {opcoesBitolaTrilho.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="ponte__body__coluna__fileira_horizontal">
                                <div className="ponte__body__caixa_sombra">
                                    <h2 className={`${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__disabled_color" : ""}`}>
                                        Viga Metálica Lado A
                                    </h2>
                                    <div className={`ponte__window__input ${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__window__input--disabled" : ""}`}>
                                        <h4>Distância entre Apoios</h4>
                                        <input
                                            className="ponte__window__width100"
                                            type="number"
                                            value={ponteConfig.caminhoRolamento_ladoA_distanciaApoios}
                                            name="caminhoRolamento_ladoA_distanciaApoios"
                                            onChange={handleChange}
                                            disabled={(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados)}
                                        >

                                        </input>
                                    </div>
                                    <div className={`ponte__window__input ${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__window__input--disabled" : ""}`}>
                                        <h4>Perfil Metálico</h4>
                                        <select
                                            className="ponte__window__width100"
                                            value={ponteConfig.caminhoRolamento_ladoA_perfilMetalico}
                                            name="caminhoRolamento_ladoA_perfilMetalico"
                                            onChange={handleChange}
                                            disabled={(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados)}
                                        >

                                        </select>
                                    </div>
                                </div>
                                <div className="ponte__body__caixa_sombra">
                                    <h2 className={`${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__disabled_color" : ""}`}>
                                        Viga Metálica Lado B
                                    </h2>
                                    <div className={`ponte__window__input ${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__window__input--disabled" : ""}`}>
                                        <h4>Distância entre Apoios</h4>
                                        <input
                                            className="ponte__window__width100"
                                            value={ponteConfig.caminhoRolamento_ladoB_distanciaApoios}
                                            name="caminhoRolamento_ladoB_distanciaApoios"
                                            onChange={handleChange}
                                            type="number"
                                            disabled={(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados)}
                                        >

                                        </input>
                                    </div>
                                    <div className={`ponte__window__input ${(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados) ? "ponte__window__input--disabled" : ""}`}>
                                        <h4>Perfil Metálico</h4>
                                        <select
                                            value={ponteConfig.caminhoRolamento_ladoB_perfilMetalico}
                                            name="caminhoRolamento_ladoB_perfilMetalico"
                                            onChange={handleChange}
                                            disabled={(desativo.caminhoRolamento_tudo || desativo.caminhoRolamento_lados)}
                                        >

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ponte__body__caixa_sombra ponte__body__caixa_sombra--scroll">
                            <h1 className={`${desativo.colunasSustentacao_tudo ? "ponte__disabled_color" : ""}`}>
                                Colunas de Sustentação
                            </h1>
                            <div className="ponte__body__coluna__fileira_horizontal">
                                <label className={`${desativo.colunasSustentacao_tudo ? "ponte__window__input--disabled" : ""}`}>
                                    <input
                                        type="radio"
                                        value="true"
                                        name="colunasSustentacao_distribuicaoIs2Lados"
                                        checked={ponteConfig.colunasSustentacao_distribuicaoIs2Lados}
                                        onChange={handleChange}
                                        disabled={desativo.colunasSustentacao_tudo}
                                    />
                                    Nos 2 Lados
                                </label>
                                <label className={`${desativo.colunasSustentacao_tudo ? "ponte__window__input--disabled" : ""}`}>
                                    <input
                                        type="radio"
                                        value="false"
                                        name="colunasSustentacao_distribuicaoIs2Lados"
                                        checked={!ponteConfig.colunasSustentacao_distribuicaoIs2Lados}
                                        onChange={handleChange}
                                        disabled={desativo.colunasSustentacao_tudo}
                                    />
                                    Em um dos lados
                                </label>
                            </div>
                            <div className="ponte__body__caixa_sombra">
                                <h1 className={`${desativo.colunasSustentacao_tudo ? "ponte__disabled_color" : ""}`}>Lado A</h1>
                                <div className="ponte__body__coluna__fileira_horizontal">
                                    <div className="ponte__window__input">
                                        <h4 className={`${desativo.colunasSustentacao_tudo ? "ponte__disabled_color" : ""}`}>Altura</h4>
                                        <input
                                            className="ponte__window__input"
                                            type="number"
                                            value={ponteConfig.colunasSustentacao_ladoA_altura}
                                            name="colunasSustentacao_ladoA_altura"
                                            onChange={handleChange}
                                            disabled={desativo.colunasSustentacao_tudo}
                                        >

                                        </input>
                                    </div>
                                    <div className="ponte__window__input">
                                        <h4 className={`${desativo.colunasSustentacao_tudo ? "ponte__disabled_color" : ""}`}>Dimensões</h4>
                                        <select
                                            value={ponteConfig.colunasSustentacao_ladoA_dimensoes}
                                            name="colunasSustentacao_ladoA_dimensoes"
                                            onChange={handleChange}
                                            disabled={desativo.colunasSustentacao_tudo}
                                        >
                                            {opcoesDimensoes.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="ponte__window__input">
                                        <h4 className={`${desativo.colunasSustentacao_tudo ? "ponte__disabled_color" : ""}`}>Número de Colunas</h4>
                                        <input
                                            className="ponte__window__input"
                                            type="number"
                                            value={ponteConfig.colunasSustentacao_ladoA_numeroColunas}
                                            name="colunasSustentacao_ladoA_numeroColunas"
                                            onChange={handleChange}
                                            disabled={desativo.colunasSustentacao_tudo}
                                        >

                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="ponte__body__caixa_sombra">
                                <h1 className={`${(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB) ? "ponte__disabled_color" : ""}`}>Lado B</h1>
                                <div className="ponte__body__coluna__fileira_horizontal">
                                    <div className="ponte__window__input">
                                        <h4 className={`${(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB) ? "ponte__disabled_color" : ""}`}>Altura</h4>
                                        <input
                                            className="ponte__window__input"
                                            type="number"
                                            value={ponteConfig.colunasSustentacao_ladoB_altura}
                                            name="colunasSustentacao_ladoB_altura"
                                            onChange={handleChange}
                                            disabled={(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB)}
                                        >

                                        </input>
                                    </div>
                                    <div className="ponte__window__input">
                                        <h4 className={`${(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB) ? "ponte__disabled_color" : ""}`}>Dimensões</h4>
                                        <select
                                            value={ponteConfig.colunasSustentacao_ladoB_dimensoes}
                                            name="colunasSustentacao_ladoB_dimensoes"
                                            onChange={handleChange}
                                            disabled={(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB)}
                                        >
                                            {opcoesDimensoes.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="ponte__window__input">
                                        <h4 className={`${(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB) ? "ponte__disabled_color" : ""}`}>Número de Colunas</h4>
                                        <input
                                            className="ponte__window__input"
                                            type="number"
                                            value={ponteConfig.colunasSustentacao_ladoB_numeroColunas}
                                            name="colunasSustentacao_ladoB_numeroColunas"
                                            onChange={handleChange}
                                            disabled={(desativo.colunasSustentacao_tudo || desativo.colunasSustentacao_ladoB)}
                                        >

                                        </input>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="ponte__body__coluna">
                        <div className="ponte__preco__window">
                            <h2>Ponte Rolante</h2>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Capacidade</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">Capacidade kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Vao Livre</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 mm</div>
                            </div>

                            <div className="ponte__preco__window__titulo">
                                Cabeceira
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Trilho CR</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Carga Máxima por roda</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>

                            <h2>Pesos Aproximados</h2>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Viga</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Par de Cabeceiras</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Talha</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Eletrificação Transversal</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Eletrificação Longitudinal</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Caminho de Rolamento</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Colunas de Apoio</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">0 kg</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Total</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>

                            <h2>Valores</h2>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Viga Principal</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Cabeceiras</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Valor Montagem Solda/Pintu</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Eletrificação Transversal</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Eletrificação Longitudinal</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Caminho de Rolamento</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>
                            <div className="ponte__preco__window__linha">
                                <div className="ponte__preco__window__linha__tag">Colunas de Apoio</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">-</div>
                            </div>

                            <div className="ponte__preco__window__linha--final">
                                <div className="ponte__preco__window__linha__tag">Total R$</div>
                                <div className="ponte__preco__window__linha__pontinhos"/>
                                <div className="ponte__preco__window__linha__valor">#N/D</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ponte__footer">
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

export default Ponte;