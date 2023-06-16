import { createTheme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    smallActionButton: true;
    smallActionButtonPressed: true;
  }
}

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "smallActionButtonPressed" },
          style: {
            boxShadow: "none",
            borderRadius: "25px",
            textTransform: "capitalize",
            fontWeight: 700,
            color: "black",
            background: "#DADADA",
            padding: "2px 6px 2px 6px",
            fontSize: ".73em",
          },
        },
        {
          props: { variant: "smallActionButton" },
          style: {
            boxShadow: "none",
            borderRadius: "25px",
            textTransform: "capitalize",
            fontWeight: 700,
            color: "white",
            background: "black",
            padding: "2px 6px 2px 6px",
            fontSize: ".73em",
          },
        },
      ],
    },
  },
});

export default theme;
