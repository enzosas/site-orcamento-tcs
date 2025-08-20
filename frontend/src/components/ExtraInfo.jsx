import "./TalhaWindow.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function ExtraInfo({ talha }){
    if (!talha) return null;
    return (
         <div className="frame-branco">
            <div className="frame-all-info">
                <p className="frame-all-info-esq">Painel de comando tipo</p>
                <p className="frame-all-info-dir">{talha.painelComandoPadrao}</p>

                <p className="frame-all-info-esq">Tensão de trabalho</p>
                <p className="frame-all-info-dir">Trifásica [AJUSTAR]</p>

                <p className="frame-all-info-esq">Tensão de comando</p>
                <p className="frame-all-info-dir">{talha.tensaoComando}</p>

                <p className="frame-all-info-esq">Sobe/Desce</p>
                <p className="frame-all-info-dir">2 velocidades [AJUSTAR]</p>

                <p className="frame-all-info-esq">Direita/Esquerda</p>
                <p className="frame-all-info-dir">0 [AJUSTAR]</p>

                <p className="frame-all-info-esq">Frente/Atrás</p>
                <p className="frame-all-info-dir">- [AJUSTAR]</p>

                <p className="frame-all-info-esq">Potência do Motor da Ponte</p>
                <p className="frame-all-info-dir">- [AJUSTAR]</p>

                <p className="frame-all-info-esq">Botoeira</p>
                <p className="frame-all-info-dir">{talha.botoeira}</p>

                <p className="frame-all-info-esq">Controle Remoto</p>
                <p className="frame-all-info-dir">Opcional[AJUSTAR]</p>

                <p className="frame-all-info-esq">Transmissor Extra</p>
                <p className="frame-all-info-dir">Opcional[AJUSTAR]</p>

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
