import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "tailwindcss/tailwind.css";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;