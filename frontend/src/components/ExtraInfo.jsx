import "./TalhaWindow.css"
import ModelSelectorFilter from "./ModelSelectorFilter";
import ModelSelectorList from "./ModelSelectorList";

function ExtraInfo(){
    return (
         <div className="frame-branco">
            <div className="frame-all-info">
                <p className="frame-all-info-esq">Painel de comando tipo</p>
                <p className="frame-all-info-dir">2 Movimentos</p>

                <p className="frame-all-info-esq">Tensão de trabalho</p>
                <p className="frame-all-info-dir">Trifásica</p>

                <p className="frame-all-info-esq">Tensão de comando</p>
                <p className="frame-all-info-dir">24 Vca</p>

                <p className="frame-all-info-esq">Sobe/Desce</p>
                <p className="frame-all-info-dir">2 velocidades</p>

                <p className="frame-all-info-esq">Direita/Esquerda</p>
                <p className="frame-all-info-dir">0</p>

                <p className="frame-all-info-esq">Frente/Atrás</p>
                <p className="frame-all-info-dir">-</p>

                <p className="frame-all-info-esq">Potência do Motor da Ponte</p>
                <p className="frame-all-info-dir">-</p>

                <p className="frame-all-info-esq">Botoeira</p>
                <p className="frame-all-info-dir">2 mov. 2 vel. + Emergência</p>

                <p className="frame-all-info-esq">Controle Remoto</p>
                <p className="frame-all-info-dir">Opcional</p>

                <p className="frame-all-info-esq">Transmissor Extra</p>
                <p className="frame-all-info-dir">Opcional</p>

                <p className="frame-all-info-esq">Sinalizador Sonoro</p>
                <p className="frame-all-info-dir">Opcional</p>

                <p className="frame-all-info-esq">Sinalizador Luminoso</p>
                <p className="frame-all-info-dir">Opcional</p>

                <p className="frame-all-info-esq">Tomada para troca Rápida</p>
                <p className="frame-all-info-dir">Opcional</p>
            </div>
        </div>
        
    )
}

export default ExtraInfo;
