import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Sinonim from "./components/Sinonim";

export default function App() {
  return (
    <Routes>
      <Route path="/menu" element={<Menu />} />
      <Route path="/sinonim" element={<Sinonim />} />
      <Route path="/antonim" element={<div>Halaman Antonim (coming soon)</div>} />
      <Route path="/analogi" element={<div>Halaman Analogi (coming soon)</div>} />

      {/* default redirect ke /menu */}
      <Route path="*" element={<Menu />} />
    </Routes>
  );
}
