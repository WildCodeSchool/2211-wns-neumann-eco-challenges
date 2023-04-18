import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./screens/Login";
import "./App.scss";
import { Dashboard } from "./screens/Dashboard";
import Grid from "@mui/material/Grid";
import { BottomMenu } from "./components/menu/BottomMenu";
import { NotificationsCenter } from "./screens/NotificationsCenter";
import { AnimatePresence } from "framer-motion";

function App() {
  const { pathname } = useLocation();
  return (
    <Grid container className="App-header">
      <main>
        <Grid>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<NotificationsCenter />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AnimatePresence>
          {pathname.includes("dashboard") && <BottomMenu />}
        </Grid>
      </main>
    </Grid>
  );
}

export default App;
