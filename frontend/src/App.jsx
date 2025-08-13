import "./App.css";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import CommandPannel from "./components/CommandPannel"

function App() {
  return (
    <div className="app-container">
      <Header />
      <ModelSelector />
      <CommandPannel />
      {/* <ProductDetails /> */}
      {/* <PriceSummary /> */}
    </div>
  );
}

export default App;