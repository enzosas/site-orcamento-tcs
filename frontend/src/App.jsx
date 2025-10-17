import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import CommandPannel from "./components/CommandPannel"
import ExtraOptions from "./components/ExtraOptions";
import TalhaWindow from "./components/TalhaWindow";
import ExtraInfo from "./components/ExtraInfo";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Imagem from "./components/Imagem";
import { API_BASE_URL } from './config';


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

	const enviarConfiguracaoParaBackend = async () => {
		try {
			const url = `${API_BASE_URL}/api/config`; 

			const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(config), 
			});

			if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.statusText}`);
			}

			const resultado = await response.json();
		} catch (error) {
			console.error('Falha ao enviar configuração:', error);
		}
		console
	};

	useEffect(() => {
			enviarConfiguracaoParaBackend();
			console.log(config);
		}, [config]);

	return (
		<div className="app-container">
			<Header />
			<div className="app-corpo">
				<div className="coluna">
					<ModelSelector setTalhaSelecionada={setTalhaSelecionada} talha={talhaSelecionada} config={config} setConfig={setConfig} />
					<CommandPannel talha={talhaSelecionada} config={config} setConfig={setConfig}/>
					<ExtraOptions config={config} setConfig={setConfig}/>
				</div>
				<div className="coluna">
					<TalhaWindow talha={talhaSelecionada} />
					<ExtraInfo talha={talhaSelecionada} config={config}/>
				</div>
				<div className="coluna">
					<Imagem talha={talhaSelecionada} />
					<Pricing />
					<Footer />  
				</div>
			</div>
		</div>
	);
}

export default App;