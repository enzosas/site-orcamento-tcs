import "./TalhaWindow.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function TalhaWindow(){
    return (
        <div>
            <div className="frame-branco">
                <h2 className="titulo-talha">
                    TCS002D06TF
                </h2>
                <div className="frame-all-info">
                    <p className="frame-all-info-esq">Modelo da talha elétrica</p>
                    <p className="frame-all-info-dir">TCS002D06TF</p>

                    <p className="frame-all-info-esq">Capacidade</p>
                    <p className="frame-all-info-dir">250 kg</p>

                    <p className="frame-all-info-esq">Grupo de Trabalho</p>
                    <p className="frame-all-info-dir">2 m / M5</p>

                    <p className="frame-all-info-esq">Tipo Construtivo</p>
                    <p className="frame-all-info-dir">Normal</p>

                    <p className="frame-all-info-esq">Curso útil do gancho</p>
                    <p className="frame-all-info-dir">6 metros</p>

                    <p className="frame-all-info-esq">Número de Ramais de Corrente</p>
                    <p className="frame-all-info-dir">1</p>

                    <p className="frame-all-info-esq">Potência motor elevação</p>
                    <p className="frame-all-info-dir">0,48 kW</p>

                    <p className="frame-all-info-esq">Velocidade de elevação</p>
                    <p className="frame-all-info-dir">2,4 / 9,6 m/min</p>

                    <p className="frame-all-info-esq">Movimento de translação</p>
                    <p className="frame-all-info-dir">Fixa</p>

                    <p className="frame-all-info-esq">Potência motor translação</p>
                    <p className="frame-all-info-dir">-</p>

                    <p className="frame-all-info-esq">Velocidade de translação</p>
                    <p className="frame-all-info-dir">-</p>

                    <p className="frame-all-info-esq">Freio no carro de translação</p>
                    <p className="frame-all-info-dir">Não</p>

                    <p className="frame-all-info-esq">Fim de curso sobe/desce</p>
                    <p className="frame-all-info-dir">Subida/Descida</p>

                    <p className="frame-all-info-esq">Fim de curso direita/esquerda</p>
                    <p className="frame-all-info-dir">Não</p>

                    <p className="frame-all-info-esq">Guia para Corrente</p>
                    <p className="frame-all-info-dir">Sim</p>

                    <p className="frame-all-info-esq">Célula de carga</p>
                    <p className="frame-all-info-dir">Não</p>

                    <p className="frame-all-info-esq">Largura da viga padrão</p>
                    <p className="frame-all-info-dir">Suspensão por Gancho</p>

                    <p className="frame-all-info-esq">Peso Aproximado</p>
                    <p className="frame-all-info-dir">26 kg</p>
                </div>
            </div>
            <img src="/TCS002D06FX.jpg" alt="Logo" />
        </div>
    )
}

export default TalhaWindow;
