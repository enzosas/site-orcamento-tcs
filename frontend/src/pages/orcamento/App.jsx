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
					<Pricing config={config} precos={precos} setPrecos={setPrecos} />
					<Footer setTalhaSelecionada={setTalhaSelecionada} config={config} setConfig={setConfig}/>  
				</div>
			</div>
		</div>
	);
}

export default App;