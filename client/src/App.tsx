import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.scss";
import { Dashboard } from "./screens/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </header>
    </div>
  );
}

export default App;
