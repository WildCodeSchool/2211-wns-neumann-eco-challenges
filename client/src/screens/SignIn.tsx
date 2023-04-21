import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { GreenMatesLogo } from "../components/common/GreenMatesLogo";
import { motion } from "framer-motion";
import { WelcomePageTemplate } from "../components/welcome/WelcomePageTemplate";

const debug = false;

const getHeader = () => {
  return <GreenMatesLogo format="graphic" size="100px" />;
};

const getFooter = (navigate: any) => {
  return (
    <Box display="flex" justifyContent="center" flexDirection={"column"}>
      <Typography color={"#A8A9A8"} fontWeight={500} variant="body2">
        Still not a green mate?
      </Typography>
      <Button
        sx={{
          padding: 0,
          color: "#3bd8a9",
          margin: 0,
          textTransform: "none",
        }}
        onClick={() => navigate("/signup")}
      >
        <Typography variant="body2">Join the crew</Typography>
      </Button>
    </Box>
  );
};
const getBody = (navigate: any) => {
  return (
    <Box
      flex={3}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      paddingX={2}
      flexDirection={"column"}
      bgcolor={!debug ? "none" : "pink"}
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/dashboard");
      }}
      component="form"
      autoComplete="off"
      sx={{
        "& fieldset": {
          borderRadius: "50px",
        },
        "& .MuiTextField-root": {
          marginY: 1.5,
        },
      }}
    >
      <Grid item paddingBottom={4}>
        <Typography textAlign={"center"} fontSize={30} fontWeight={600}>
          Nice to see you back!
        </Typography>
        <Typography textAlign={"center"} color={"grey"} fontSize={18}>
          Have a wonderful day.
        </Typography>
      </Grid>
      <Grid container item paddingX={2} paddingBottom={2}>
        <TextField
          fullWidth
          required
          id="email-required"
          label="Email"
          variant="outlined"
          type="text"
        />
        <TextField
          fullWidth
          required
          id="password-required"
          label="Password"
          type="password"
          variant="outlined"
        />
      </Grid>

      <Grid
        item
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        padding={2}
      >
        <Button
          type="submit"
          variant="contained"
          style={{
            textTransform: "uppercase",
            borderRadius: "25px",
            padding: "0.7em 2em 0.7em 2em",
            fontWeight: 500,
            background: "black",
          }}
        >
          Sign in
        </Button>
      </Grid>
    </Box>
  );
};

export const SignIn = () => {
  const navigate = useNavigate();
  return (
    <WelcomePageTemplate
      header={getHeader()}
      body={getBody(navigate)}
      footer={getFooter(navigate)}
    />
  );
};
