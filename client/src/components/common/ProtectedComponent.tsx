import { ReactNode } from "react";
import { useAppSelector } from "../../reducer/hooks";
import { Navigate } from "react-router-dom";

// Wrapper component that checks if a user and a token are stored
// If so, it allows the component to render otherwise it redirects the user to the main page
export const ProtectedComponent = ({ component }: { component: ReactNode }) => {
  const { user, token } = useAppSelector((store) => ({
    user: store.user.user,
    token: store.user.token,
  }));
  if (token === null || user === null) return <Navigate to={"/"} replace />;
  return <div>{component}</div>;
};
