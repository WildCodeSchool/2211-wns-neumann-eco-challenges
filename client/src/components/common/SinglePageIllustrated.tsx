import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const SinglePageIllustrated = ({
  header,
  content,
}: {
  header: ReactNode;
  content: ReactNode;
}) => {
  return (
    <motion.div initial={{ translateX: "100%" }} animate={{ translateX: "0" }}>
      <Grid
        height={"100vh"}
        display={"flex"}
        container
        flexDirection={"column"}
      >
        <Grid item flex={0.3} position="relative">
          {header}
        </Grid>
        <Grid
          sx={{
            "& fieldset, .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& .MuiTextField-root": {
              marginY: 1.5,
            },
          }}
          item
          flex={0.7}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {content}
        </Grid>
      </Grid>
    </motion.div>
  );
};
