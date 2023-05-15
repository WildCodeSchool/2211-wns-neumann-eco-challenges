import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { GreenMatesLogo } from "../components/common/GreenMatesLogo";
import { WelcomePageTemplate } from "../components/welcome/WelcomePageTemplate";
import {
  SignUpMutationFn,
  UserInput,
  useSignUpMutation,
} from "../gql/generated/schema";
import { useForm } from "react-hook-form";
import { useState } from "react";

const minPasswordLength = 8;
const getHeader = () => {
  return <GreenMatesLogo format="graphic" size="100px" />;
};

const getFooter = (navigate: any) => {
  return (
    <Box display="flex" justifyContent="center" flexDirection={"column"}>
      <Typography color={"#A8A9A8"} fontWeight={500} variant="body2">
        Already have an account ?
      </Typography>
      <Button
        sx={{
          padding: 0,
          color: "#3bd8a9",
          margin: 0,
          textTransform: "capitalize",
        }}
        onClick={() => navigate("/signin")}
      >
        <Typography variant="body2">Sign in</Typography>
      </Button>
    </Box>
  );
};
const getBody = (
  register: any,
  handleSubmit: any,
  signUp: SignUpMutationFn,
  [signUpError, setSignUpError]: any,
  errors: any,
  navigate: any
) => {
  return (
    <Box
      flex={3}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      paddingX={2}
      flexDirection={"column"}
      onSubmit={handleSubmit(
        async ({ email, firstName, lastName, password }: UserInput) => {
          try {
            await signUp({
              variables: {
                userInputs: {
                  email,
                  firstName,
                  lastName,
                  password,
                },
              },
            });
            navigate("/dashboard");
          } catch (error: any) {
            setSignUpError(error.message);
          }
        }
      )}
      component="form"
      sx={{
        "& fieldset, .MuiOutlinedInput-root": {
          borderRadius: "50px",
        },
        "& .MuiTextField-root": {
          marginY: 1.5,
        },
      }}
    >
      <Grid item paddingBottom={4}>
        <Typography textAlign={"center"} fontSize={30} fontWeight={600}>
          Create your account.
        </Typography>
        <Typography textAlign={"center"} color={"grey"} fontSize={18}>
          Help us to make the planet greener.
        </Typography>
      </Grid>
      <Grid container item paddingX={2} paddingBottom={2}>
        <TextField
          fullWidth
          error={errors["firstName"] ?? signUpError.length !== 0 ? true : false}
          helperText={errors["firstName"] ?? false ? "Provide a firstname" : ""}
          id="firstname-required"
          label="Firstname"
          variant="outlined"
          type="text"
          {...register("firstName", { required: true })}
        />
        <TextField
          fullWidth
          error={errors["lastName"] ?? signUpError.length !== 0 ? true : false}
          id="lastname-required"
          label="Lastname"
          type="text"
          variant="outlined"
          helperText={errors["lastName"] ?? false ? "Provide a lastname" : ""}
          {...register("lastName", { required: true })}
        />
        <TextField
          fullWidth
          error={errors["email"] ?? signUpError.length !== 0 ? true : false}
          id="email-required"
          label="Email"
          variant="outlined"
          type="text"
          helperText={
            errors["email"] ?? false ? "Provide a correct email address" : ""
          }
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <TextField
          fullWidth
          id="password-required"
          error={errors["password"] ?? signUpError.length !== 0 ? true : false}
          helperText={
            <div>
              <div>{`Provide a password with at least ${minPasswordLength} characters.`}</div>
              <div>{`${signUpError ?? ""}`}</div>
            </div>
          }
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: true,
            minLength: minPasswordLength,
          })}
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
          Sign up
        </Button>
      </Grid>
    </Box>
  );
};

export const SignUp = () => {
  const [signUp, { data, loading, error }] = useSignUpMutation();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <WelcomePageTemplate
      header={getHeader()}
      body={getBody(
        register,
        handleSubmit,
        signUp,
        [signUpError, setSignUpError],
        errors,
        navigate
      )}
      footer={getFooter(navigate)}
    />
  );
};
