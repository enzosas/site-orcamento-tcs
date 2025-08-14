import "./App.css";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import CommandPannel from "./components/CommandPannel"
import ExtraOptions from "./components/ExtraOptions";
import TalhaWindow from "./components/TalhaWindow";

function App() {
  return (
    <div className="app-container">
      <Header />
      <ModelSelector />
      <CommandPannel />
      <ExtraOptions />
      <TalhaWindow />
      {/* <PriceSummary /> */}
    </div>
  );
}

export default App;