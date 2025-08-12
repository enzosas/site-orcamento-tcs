import React from "react";
import "./App.css";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
// import ControlPanel from "./components/ControlPanel";
// import ProductDetails from "./components/ProductDetails";
// import PriceSummary from "./components/PriceSummary";

function App() {
  return (
    <div className="app-container">
      <Header />
      <ModelSelector />
      <ModelSelector />
      {/* <ControlPanel /> */}
      {/* <ProductDetails /> */}
      {/* <PriceSummary /> */}
    </div>
  );
}

export default App;