import Grid from "@mui/material/Grid/Grid";
import { motion } from "framer-motion";

const debug = false;
export const WelcomePageTemplate = ({
  header,
  body,
  footer,
}: {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0" }}
      exit={{ translateX: "-100%" }}
    >
      <Grid
        height={"100vh"}
        container
        width={"100vw"}
        position={"relative"}
        bgcolor={!debug ? "none" : "red"}
        direction={"column"}
      >
        <Grid
          display={"flex"}
          bgcolor={!debug ? "none" : "orange"}
          alignItems={"flex-start"}
        >
          {header}
        </Grid>

        {body}

        <Grid
          flex={0.5}
          bgcolor={!debug ? "none" : "blue"}
          item
          justifyContent={"flex-start"}
          alignItems={"center"}
          display={"flex"}
          direction={"column"}
        >
          {footer}
        </Grid>
      </Grid>
    </motion.div>
  );
};
