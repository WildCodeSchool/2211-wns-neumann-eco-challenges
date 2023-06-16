import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "25px",
          textTransform: "capitalize",
          fontWeight: 500,
          color: "#FFFF",
          background: "black",
        },
      },
    },
  },
});

export default theme;
