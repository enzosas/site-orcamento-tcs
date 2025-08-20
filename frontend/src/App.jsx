import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import CommandPannel from "./components/CommandPannel"
import ExtraOptions from "./components/ExtraOptions";
import TalhaWindow from "./components/TalhaWindow";
import ExtraInfo from "./components/ExtraInfo";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Imagem from "./components/Imagem";


function App() {

	const [talhaSelecionada, setTalhaSelecionada] = useState(null);
	
	const opcoes = []

	return (
		<div className="app-container">
			<Header />
			<div className="app-corpo">
				<div className="coluna">
					<ModelSelector setTalhaSelecionada={setTalhaSelecionada} talha={talhaSelecionada} />
					<CommandPannel talha={talhaSelecionada}/>
					<ExtraOptions />
				</div>
				<div className="coluna">
					<TalhaWindow talha={talhaSelecionada} />
					<ExtraInfo talha={talhaSelecionada}/>
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