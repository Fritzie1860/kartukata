import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Menu from "./components/Menu.jsx";
import Sinonim from "./components/Sinonim";
import Antonim from "./components/Antonim";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/menu" replace />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/sinonim" element={<Sinonim />} />
      <Route path="/antonim" element={<Antonim />} />
      <Route path="/analogi" element={<div>Halaman Analogi (coming soon)</div>} />

      {/* default redirect ke /menu */}
      <Route path="*" element={<Navigate to="/menu" replace />} />

    </Routes>
  );
}
