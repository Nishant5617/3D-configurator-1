import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductConfigurator from "./components/ProductConfigurator";
import ModelViewer2 from "./ModelViewer2";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductConfigurator />} />
        <Route path="/model-viewer" element={<ModelViewer2 />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;