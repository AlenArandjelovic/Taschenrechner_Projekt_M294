// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Calculator from "./Calculator";
import Verlauf from "./Verlauf";
import Navigation from "./Navigation";

export default function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/verlauf" element={<Verlauf />} />
        <Route path="*" element={<Calculator />} />
      </Routes>
    </>
  );
}
