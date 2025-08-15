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


function App() {
  const [talhaSelecionada, setTalhaSelecionada] = useState(null);


  return (
    <div className="app-container">
      <Header />
      
          <ModelSelector setTalhaSelecionada={setTalhaSelecionada} />
          <CommandPannel talha={talhaSelecionada}/>
          <ExtraOptions />
          <TalhaWindow talha={talhaSelecionada} />
          <ExtraInfo />
          
          <Pricing />
          <Footer />  

    </div>
  );
}

export default App;