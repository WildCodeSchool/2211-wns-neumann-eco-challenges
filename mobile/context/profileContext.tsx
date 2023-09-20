import { createContext } from "react";

export const ProfileContext = createContext<{
  isTokenSet: boolean;
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isTokenSet: false, setToken: undefined });
