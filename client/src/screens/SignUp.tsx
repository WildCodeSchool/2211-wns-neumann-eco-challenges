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
  SignInMutationFn,
  UserInput,
} from "../gql/generated/schema";
import { useForm } from "react-hook-form";
import { thunkSignIn, thunkSignUp } from "../reducer/user/user.reducer";
import { RequestStatus } from "../reducer/requestStatus.enums";
import { useAppDispatch, useAppSelector } from "../reducer/hooks";
import { AppDispatch } from "../store";

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
  signUpError: string,
  dispatch: AppDispatch,
  formErrors: any,
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
          const {
            meta: { requestStatus: requestStatusSignUp },
          } = await dispatch(
            thunkSignUp({ email, firstName, lastName, password })
          );

          if (requestStatusSignUp === RequestStatus.fulfilled) {
            const {
              meta: { requestStatus: requestSignInStatus },
            } = await dispatch(thunkSignIn({ email, password }));

            if (requestSignInStatus === RequestStatus.fulfilled) {
              navigate("/dashboard");
            }
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
          error={formErrors["firstName"] ?? signUpError ? true : false}
          helperText={
            formErrors["firstName"] ?? false ? "Provide a firstname" : ""
          }
          id="firstname-required"
          label="Firstname"
          variant="outlined"
          type="text"
          {...register("firstName", { required: true })}
        />
        <TextField
          fullWidth
          error={formErrors["lastName"] ?? signUpError ? true : false}
          id="lastname-required"
          label="Lastname"
          type="text"
          variant="outlined"
          helperText={
            formErrors["lastName"] ?? false ? "Provide a lastname" : ""
          }
          {...register("lastName", { required: true })}
        />
        <TextField
          fullWidth
          error={formErrors["email"] ?? signUpError ? true : false}
          id="email-required"
          label="Email"
          variant="outlined"
          type="text"
          helperText={
            formErrors["email"] ?? false
              ? "Provide a correct email address"
              : ""
          }
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <TextField
          fullWidth
          id="password-required"
          error={formErrors["password"] ?? signUpError ? true : false}
          helperText={
            <div>
              <div>{`Provide a password with at least ${minPasswordLength} characters.`}</div>
              <div>{`${signUpError}`}</div>
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signUpError = useAppSelector(
    (state) => state.user.errors.signUp?.message ?? ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  return (
    <WelcomePageTemplate
      header={getHeader()}
      body={getBody(
        register,
        handleSubmit,
        signUpError,
        dispatch,
        formErrors,
        navigate
      )}
      footer={getFooter(navigate)}
    />
  );
};
