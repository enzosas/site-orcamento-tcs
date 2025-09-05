import "./TalhaWindow.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function ExtraInfo({ talha, config }){
    if (!talha) return null;
    return (
         <div className="frame-branco">
            <div className="frame-all-info">
                <p className="frame-all-info-esq">Painel de comando tipo</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? talha.painelComandoPadrao : "Sem painel de comando"}</p>

                <p className="frame-all-info-esq">Tensão de trabalho</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? config.tensao : ""}</p>

                <p className="frame-all-info-esq">Tensão de comando</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? talha.tensaoComando : ""}</p>

                <p className="frame-all-info-esq">Sobe/Desce</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? (config.duplaVelocidadeElevacao? "2 velocidades com inversor" : talha.acionamentoMotorElevacao) : ""}</p>

                <p className="frame-all-info-esq">Direita/Esquerda</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? (config.duplaVelocidadeTranslacao? "2 velocidades com inversor" : talha.acionamentoMotorTranslacao) : ""}</p>

                <p className="frame-all-info-esq">Frente/Atrás</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? (config.painel6Mov ? "2 movimentos" : "Não") : ""}</p>

                <p className="frame-all-info-esq">Potência do Motor da Ponte</p>
                <p className="frame-all-info-dir">{config.painel6Mov ? config.potenciaMotores : ""}</p>

                <p className="frame-all-info-esq">Botoeira</p>
                <p className="frame-all-info-dir">{!config.excluirPainel ? talha.botoeira : ""}</p>

                <p className="frame-all-info-esq">Controle Remoto</p>
                <p className="frame-all-info-dir">{config.controleRemoto ? config.modeloControle : "Não"}</p>

                <p className="frame-all-info-esq">Transmissor Extra</p>
                <p className="frame-all-info-dir">{config.transmissorExtra ? "Sim" : "Não"}</p>

                <p className="frame-all-info-esq">Sinalizador Sonoro</p>
                <p className="frame-all-info-dir">Opcional[AJUSTAR]</p>

                <p className="frame-all-info-esq">Sinalizador Luminoso</p>
                <p className="frame-all-info-dir">Opcional[AJUSTAR]</p>

                <p className="frame-all-info-esq">Tomada para troca Rápida</p>
                <p className="frame-all-info-dir">Opcional[AJUSTAR]</p>
            </div>
        </div>
        
    )
}

export default ExtraInfo;
