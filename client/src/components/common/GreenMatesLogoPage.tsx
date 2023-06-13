import { motion } from "framer-motion";
import { GreenMatesLogo } from "./GreenMatesLogo";

export const GreenMatesLogoPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GreenMatesLogo format="graphic" size="220px" />
        </motion.div>
      </motion.div>
    </div>
  );
};
