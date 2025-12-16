import { getDadosExibicao } from "../../../../utils/dadosExibicao";

function ExtraInfo({ talha, config }){
    if (!talha) return null;

    const dadosExibicao = getDadosExibicao(talha, config);
    
    return (
         <div className="frame-branco">
            <div className="frame-all-info">
                <p className="frame-all-info-esq">Painel de comando tipo</p>
                <p className="frame-all-info-dir">{dadosExibicao.painelComandoTipo}</p>

                <p className="frame-all-info-esq">Tensão de trabalho</p>
                <p className="frame-all-info-dir">{dadosExibicao.tensaoTrabalho}</p>

                <p className="frame-all-info-esq">Tensão de comando</p>
                <p className="frame-all-info-dir">{dadosExibicao.tensaoComando}</p>

                <p className="frame-all-info-esq">Sobe/Desce</p>
                <p className="frame-all-info-dir">{dadosExibicao.sobeDesce}</p>

                <p className="frame-all-info-esq">Direita/Esquerda</p>
                <p className="frame-all-info-dir">{dadosExibicao.direitaEsquerda}</p>

                <p className="frame-all-info-esq">Frente/Atrás</p>
                <p className="frame-all-info-dir">{dadosExibicao.frenteTras}</p>

                <p className="frame-all-info-esq">Potência do Motor da Ponte</p>
                <p className="frame-all-info-dir">{dadosExibicao.potenciaMotorPonte}</p>

                <p className="frame-all-info-esq">Botoeira</p>
                <p className="frame-all-info-dir">{dadosExibicao.botoeira}</p>

                <p className="frame-all-info-esq">Controle Remoto</p>
                <p className="frame-all-info-dir">{dadosExibicao.controleRemoto}</p>

                <p className="frame-all-info-esq">Transmissor Extra</p>
                <p className="frame-all-info-dir">{dadosExibicao.transmissorExtra}</p>

                <p className="frame-all-info-esq">Sinalizador Sonoro</p>
                <p className="frame-all-info-dir">{dadosExibicao.sinalizadores}</p>

                <p className="frame-all-info-esq">Sinalizador Luminoso</p>
                <p className="frame-all-info-dir">{dadosExibicao.sinalizadores}</p>

                <p className="frame-all-info-esq">Tomada para troca Rápida</p>
                <p className="frame-all-info-dir">{dadosExibicao.tomadaTrocaRapida}</p>
            </div>
        </div>
        
    )
}

export default ExtraInfo;
