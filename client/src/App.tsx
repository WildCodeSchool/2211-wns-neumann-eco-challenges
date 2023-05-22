import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { v4 as uuid } from "uuid";
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
import { ProtectedComponent } from "./components/common/ProtectedComponent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CreateChallenge } from "./screens/challengeCreationFlow/CreateChallenge";
import { GenericDialog } from "./screens/GenericDialog";
import { useAppSelector } from "./reducer/hooks";
import { ScrollTopScreen } from "./screens/ScrollTopScreen";

function App() {
  const { pathname } = useLocation();
  return (
    <Grid
      container
      className={
        pathname === "/" || pathname.includes("/sign")
          ? "App-header welcome"
          : pathname.includes("/dashboard")
          ? "App-header dashboard"
          : "App-header"
      }
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </LocalizationProvider>
    </Grid>
  );
}

export default App;

const AppContent = () => {
  const { pathname } = useLocation();
  const event = useAppSelector((store) => store.event);
  return (
    <AnimatePresence>
      <main>
        <Grid position={"relative"}>
          {event.id !== null && (
            <GenericDialog
              title={event.title!}
              body={event.body}
              show={true}
              redirectUrl={event.redirectUrl}
            />
          )}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/dashboard"
              element={
                <ScrollTopScreen
                  key={uuid()}
                  screen={<ProtectedComponent component={<Dashboard />} />}
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <ScrollTopScreen
                  key={uuid()}
                  screen={
                    <ProtectedComponent component={<NotificationsCenter />} />
                  }
                />
              }
            />
            <Route
              path="/create-challenge"
              element={
                <ScrollTopScreen
                  key={uuid()}
                  screen={
                    <ProtectedComponent component={<CreateChallenge />} />
                  }
                />
              }
            />
            <Route
              path="/signin"
              element={<ScrollTopScreen key={uuid()} screen={<SignIn />} />}
            />

            <Route
              path="/signup"
              element={<ScrollTopScreen key={uuid()} screen={<SignUp />} />}
            />
          </Routes>
          {pathname.includes("dashboard") && <BottomMenu />}
        </Grid>
      </main>
    </AnimatePresence>
  );
};
