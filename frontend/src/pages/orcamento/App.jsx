import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ModelSelector from "./components/ModelSelector/ModelSelector";
import CommandPannel from "./components/CommandPannel/CommandPannel"
import ExtraOptions from "./components/Extra/ExtraOptions";
import TalhaWindow from "./components/TalhaWindow/TalhaWindow";
import ExtraInfo from "./components/Extra/ExtraInfo";
import Pricing from "./components/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import Imagem from "./components/TalhaWindow/Imagem";
import { API_BASE_URL } from '../../config';
import {
    opcoesFormaConstrutiva,
    opcoesCapacidade,
    opcoesEletrificacaoTransversal,
    opcoesEletrificacaoLongitudinal,
    opcoesTipoCaminhoRolamento,
    opcoesBitolaTrilho,
    opcoesDimensoes
} from './components/Footer/Ponte/ponteConstants';


function App() {

	const [talhaSelecionada, setTalhaSelecionada] = useState(null);
	
	const [config, setConfig] = useState({
		talhaSelecionada: "",
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
	});
	
	const [precos, setPrecos] = useState ({
		totalSch: null,
		totalTcs: null,
		circuitoTcs: null,
		circuitoSch: null,
		adaptadorViga: null,
		talhaSemCircuito: null
	});

	const [precosPesosPonte, setPrecosPesosPonte] = useState ({
		cabeceira: null,
		trilhoCR: null,
		cargaMaximaRoda: null,
		pesoViga: null,
		pesoParCabeceira: null,
		pesoTalha: null,
		pesoEletrificacaoTransversal: null,
		pesoEletrificacaoLongitudinal: null,
		pesoCaminhoRolamento: null,
		pesoColunasApoio: null,
		pesoTotal: null,
		precoVigaPrincipal: null,
		precoCabeceiras: null,
		precoMontagem: null,
		precoEletrificacaoTransversal: null,
		precoEletrificacaoLongitudinal: null,
		precoCaminhoRolamento: null,
		precoColunasApoio: null,
		precoTotal: null,
	});

	const [ponteConfig, setPonteConfig] = useState({
		incluir: false,
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

	const [preferencias, setPreferencias] = useState({
		mostrarLogs: false,
	})

	return (
		<div className="app-container">
			<Header />
			<div className="app-corpo">
				<div className="coluna">
					<ModelSelector setTalhaSelecionada={setTalhaSelecionada} talha={talhaSelecionada} config={config} setConfig={setConfig} />
					<CommandPannel talha={talhaSelecionada} config={config} setConfig={setConfig}/>
					<ExtraOptions talha={talhaSelecionada} config={config} setConfig={setConfig}/>
				</div>
				<div className="coluna">
					<TalhaWindow talha={talhaSelecionada} config={config}/>
					<ExtraInfo talha={talhaSelecionada} config={config}/>
				</div>
				<div className="coluna">
					<Imagem talha={talhaSelecionada} />
					<Pricing 
						config={config} 
						precos={precos} 
						setPrecos={setPrecos} 
						preferencias={preferencias} 
						precosPesosPonte={precosPesosPonte} 
						ponteConfig={ponteConfig}
					/>
					<Footer 
						talha={talhaSelecionada} 
						setTalhaSelecionada={setTalhaSelecionada} 
						config={config} 
						setConfig={setConfig} 
						precos={precos} 
						preferencias={preferencias} 
						setPreferencias={setPreferencias}
						precosPesosPonte={precosPesosPonte}
						setPrecosPesosPonte={setPrecosPesosPonte}
						ponteConfig={ponteConfig} 
						setPonteConfig={setPonteConfig}
					/>  
				</div>
			</div>
		</div>
	);
}

export default App;