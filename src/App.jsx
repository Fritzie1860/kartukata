import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Sinonim from "./components/Sinonim";
import Antonim from "./components/Antonim";

export default function App() {
  return (
    <Routes>
      <Route path="/menu" element={<Menu />} />
      <Route path="/sinonim" element={<Sinonim />} />
      <Route path="/antonim" element={<Antonim />} />
      <Route path="/analogi" element={<div>Halaman Analogi (coming soon)</div>} />

      {/* default redirect ke /menu */}
      <Route path="*" element={<Menu />} />
    </Routes>
  );
}
