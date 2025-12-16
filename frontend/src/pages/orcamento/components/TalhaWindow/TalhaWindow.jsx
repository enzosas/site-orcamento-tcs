import "./TalhaWindow.css"
import { formatarConfigExibicao, formatarTalhaExibicao } from "../../../../utils/dadosExibicao.js";

function TalhaWindow({ talha, config }){
    if (!talha) return null;

    const talhaFormatada = formatarTalhaExibicao(talha);
    const configFormatada = formatarConfigExibicao(config);

    return (
        <div>
            <div className="frame-branco">
                <h2 className="titulo-talha">
                    {talha.modelo}
                </h2>
                <div className="frame-all-info">
                    <p className="frame-all-info-esq">Modelo da talha elétrica</p>
                    <p className="frame-all-info-dir">{talhaFormatada.modelo}</p>

                    <p className="frame-all-info-esq">Capacidade</p>
                    <p className="frame-all-info-dir">{talhaFormatada.capacidade}</p>

                    <p className="frame-all-info-esq">Grupo de Trabalho</p>
                    <p className="frame-all-info-dir">{talhaFormatada.grupoTrabalho}</p>

                    <p className="frame-all-info-esq">Tipo Construtivo</p>
                    <p className="frame-all-info-dir">{talhaFormatada.formaConstrutiva}</p>

                    <p className="frame-all-info-esq">Curso útil do gancho</p>
                    <p className="frame-all-info-dir">{talhaFormatada.cursoUtilGancho}</p>

                    <p className="frame-all-info-esq">Número de Ramais de Corrente</p>
                    <p className="frame-all-info-dir">{talhaFormatada.ramais}</p>

                    <p className="frame-all-info-esq">Potência motor elevação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.motorElevacao}</p>

                    <p className="frame-all-info-esq">Velocidade de elevação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.velElevacaoPadrao}</p>

                    <p className="frame-all-info-esq">Movimento de translação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.tipoTrole}</p>

                    <p className="frame-all-info-esq">Potência motor translação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.motorTranslacao}</p>

                    <p className="frame-all-info-esq">Velocidade de translação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.velTranslacaoPadrao}</p>

                    <p className="frame-all-info-esq">Freio no carro de translação</p>
                    <p className="frame-all-info-dir">{talhaFormatada.freioNoCarroTranslacao}</p>

                    <p className="frame-all-info-esq">Fim de curso sobe/desce</p>
                    <p className="frame-all-info-dir">{talhaFormatada.fimCursoSobe}</p>

                    <p className="frame-all-info-esq">Fim de curso direita/esquerda</p>
                    <p className="frame-all-info-dir">{configFormatada.fimCursoEsquerdaDireita}</p>

                    <p className="frame-all-info-esq">{talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo"}</p>
                    <p className="frame-all-info-dir">{configFormatada.guiaCaboAco}</p>

                    <p className="frame-all-info-esq">Célula de carga</p>
                    <p className="frame-all-info-dir">{configFormatada.celulaCarga}</p>

                    <p className="frame-all-info-esq">Largura da viga padrão</p>
                    <p className="frame-all-info-dir">{talhaFormatada.larguraVigaPadrao}</p>

                    <p className="frame-all-info-esq">Peso Aproximado</p>
                    <p className="frame-all-info-dir">{talhaFormatada.peso}</p>
                </div>
            </div>
        </div>
    )
}

export default TalhaWindow;
