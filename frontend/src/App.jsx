import "./App.css";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import CommandPannel from "./components/CommandPannel"
import ExtraOptions from "./components/ExtraOptions";
import TalhaWindow from "./components/TalhaWindow";
import ExtraInfo from "./components/ExtraInfo";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="app-container">
      <Header />
      <ModelSelector />
      <CommandPannel />
      <ExtraOptions />
      <TalhaWindow />
      <ExtraInfo />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;