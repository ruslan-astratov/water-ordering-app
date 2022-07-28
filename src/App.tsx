import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";

import Catalog from "./pages/Catalog/Catalog";
import Basket from "./pages/Basket/Basket";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/water-ordering-app" element={<Catalog />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default App;
