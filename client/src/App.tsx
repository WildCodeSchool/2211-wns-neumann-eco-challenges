import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.scss";
import { Dashboard } from "./screens/Dashboard";
import Grid from "@mui/material/Grid";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BottomMenu } from "./screens/components/menu/BottomMenu";

function App() {
  return (
    <Grid container className="App-header">
      <main>
        <Grid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <BottomMenu />
        </Grid>
      </main>
    </Grid>
  );
}

export default App;
