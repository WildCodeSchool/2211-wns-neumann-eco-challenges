import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { Dashboard } from "./screens/Dashboard";
import Grid from "@mui/material/Grid";
import { BottomMenu } from "./components/menu/BottomMenu";
import { NotificationsCenter } from "./screens/NotificationsCenter";
import { AnimatePresence } from "framer-motion";
import { Welcome } from "./screens/Welcome";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  const { pathname } = useLocation();
  return (
    <Grid
      container
      className={
        pathname === "/" || pathname.includes("/sign")
          ? "App-header welcome"
          : "App-header"
      }
    >
      <Provider store={store}>
        <main>
          <Grid>
            <AnimatePresence>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/notifications"
                  element={<NotificationsCenter />}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </AnimatePresence>
            {pathname.includes("dashboard") && <BottomMenu />}
          </Grid>
        </main>
      </Provider>
    </Grid>
  );
}

export default App;
