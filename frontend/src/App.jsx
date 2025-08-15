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
      <div className="content">
          <div className="collumn">
          <ModelSelector setTalhaSelecionada={setTalhaSelecionada} />
          <hr></hr>
          <ExtraOptions />
          
        </div>
        <div className="collumn">
          <TalhaWindow talha={talhaSelecionada} />
          <ExtraInfo />
        </div>
        <div className="collumn">
          <CommandPannel />
          <Pricing />
          <Footer />  
          
          

        </div>
      </div>
      
      
      
      
    </div>
  );
}

export default App;