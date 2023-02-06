import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <main className="bg-background">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
