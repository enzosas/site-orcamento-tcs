import "./TalhaWindow.css"

function TalhaWindow({ talha, config }){
    if (!talha) return null;
    return (
        <div>
            <div className="frame-branco">
                <h2 className="titulo-talha">
                    {talha.modelo}
                </h2>
                <div className="frame-all-info">
                    <p className="frame-all-info-esq">Modelo da talha elétrica</p>
                    <p className="frame-all-info-dir">{talha.modelo}</p>

                    <p className="frame-all-info-esq">Capacidade</p>
                    <p className="frame-all-info-dir">{talha.capacidade} kg</p>

                    <p className="frame-all-info-esq">Grupo de Trabalho</p>
                    <p className="frame-all-info-dir">{talha.grupoTrabalho}</p>

                    <p className="frame-all-info-esq">Tipo Construtivo</p>
                    <p className="frame-all-info-dir">{talha.formaConstrutiva}</p>

                    <p className="frame-all-info-esq">Curso útil do gancho</p>
                    <p className="frame-all-info-dir">{talha.cursoUtilGancho} metros</p>

                    <p className="frame-all-info-esq">Número de Ramais de Corrente</p>
                    <p className="frame-all-info-dir">{talha.ramais}</p>

                    <p className="frame-all-info-esq">Potência motor elevação</p>
                    <p className="frame-all-info-dir">{talha.motorElevacao}</p>

                    <p className="frame-all-info-esq">Velocidade de elevação</p>
                    <p className="frame-all-info-dir">{talha.velElevacaoPadrao} m/min</p>

                    <p className="frame-all-info-esq">Movimento de translação</p>
                    <p className="frame-all-info-dir">{talha.tipoTrole}</p>

                    <p className="frame-all-info-esq">Potência motor translação</p>
                    <p className="frame-all-info-dir">{talha.motorTranslacao}</p>

                    <p className="frame-all-info-esq">Velocidade de translação</p>
                    <p className="frame-all-info-dir">{talha.velTranslacaoPadrao}</p>

                    <p className="frame-all-info-esq">Freio no carro de translação</p>
                    <p className="frame-all-info-dir">{talha.frenoNoCarroTranslacao ? "Sim" : "Não"}</p>

                    <p className="frame-all-info-esq">Fim de curso sobe/desce</p>
                    <p className="frame-all-info-dir">{talha.fimCursoSobe}</p>

                    <p className="frame-all-info-esq">Fim de curso direita/esquerda</p>
                    <p className="frame-all-info-dir">{config.fimCursoEsquerdaDireita ? "Sim" : "Não"}</p>

                    <p className="frame-all-info-esq">{talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo"}</p>
                    <p className="frame-all-info-dir">{config.guiaCaboAco ? "Sim" : "Não"}</p>

                    <p className="frame-all-info-esq">Célula de carga</p>
                    <p className="frame-all-info-dir">{config.celulaCarga ? "Sim" : "Não"}</p>

                    <p className="frame-all-info-esq">Largura da viga padrão</p>
                    <p className="frame-all-info-dir">{talha.larguraVigaPadrao}</p>

                    <p className="frame-all-info-esq">Peso Aproximado</p>
                    <p className="frame-all-info-dir">{talha.peso} kg</p>
                </div>
            </div>
        </div>
    )
}

export default TalhaWindow;
