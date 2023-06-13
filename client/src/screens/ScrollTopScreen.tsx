import { ReactNode, useEffect } from "react";
import { scrollToTop } from "../tools/render.tools";

export const ScrollTopScreen = ({ screen }: { screen: ReactNode }) => {
  useEffect(() => {
    return () => {
      scrollToTop();
    };
  }, []);

  return <div>{screen}</div>;
};
