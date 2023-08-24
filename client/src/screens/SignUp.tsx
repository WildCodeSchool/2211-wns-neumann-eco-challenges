import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { GreenMatesLogo } from "../components/common/GreenMatesLogo";
import { WelcomePageTemplate } from "../components/welcome/WelcomePageTemplate";
import { UserInput } from "../gql/generated/schema";
import { useForm } from "react-hook-form";
import { thunkSignIn, thunkSignUp } from "../reducer/user/user.reducer";
import { RequestStatus } from "../reducer/requestStatus.enums";
import { useAppDispatch, useAppSelector } from "../reducer/hooks";
import { AppDispatch } from "../store";
import * as LR from "@uploadcare/blocks";
import { useEffect, useRef, useState } from "react";

LR.registerBlocks(LR);

const idCallback = (e: any) => {
  const dialog = document
    .querySelector("lr-file-uploader-regular")
    ?.shadowRoot?.querySelector("dialog");

  if (
    dialog != null &&
    dialog.open &&
    e.target.localName !== "lr-file-uploader-regular"
  ) {
    showFileUploader(false);
  }
};

const showFileUploader = (isVisible: boolean) => {
  console.log({isVisible})
  const shadowRoot = document.querySelector(
    "lr-file-uploader-regular"
  )?.shadowRoot;
  shadowRoot
    ?.querySelector("lr-start-from")
    ?.setAttribute("active", `${isVisible}`);
  const modal = shadowRoot?.querySelector("dialog");
  if (isVisible) {
    modal?.showModal();
    setTimeout(() => window.addEventListener("click", idCallback), 1000);
  } else {
    modal?.close();
    window.removeEventListener("click", idCallback);
  }
};

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
  navigate: any,
  dataOutputRef: React.MutableRefObject<LR.DataOutput | undefined>,
  userPicture: string | null
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
            thunkSignUp({ email, firstName, lastName, password, picture: userPicture })
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
          helperText={formErrors["firstName"] ? "Provide a firstname" : ""}
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
        <Button 
          variant="outlined"
          color="inherit"
          onClick={() => {
            showFileUploader(true)
          }}
        > 
          Profile picture
        </Button>

        <lr-config
          ctx-name="my-uploader"
          pubkey="d3e850d949e62ece4422"
          imgOnly={true}
          multiple={false}
          source-list="local, camera"
        ></lr-config>

        <div style={{ width: 0, height: 0, opacity: 0 }}>
          <lr-file-uploader-regular
            class="my-config"
            ctx-name="my-uploader"
            css-src={"/uploader.css"}
          ></lr-file-uploader-regular>
        </div>

        <lr-data-output
          ctx-name="my-uploader"
          ref={dataOutputRef}
          use-event
          hidden
        ></lr-data-output>
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
          sx={{
            "&:hover, &:focus, &:active ": {
              background: "black",
            },
            boxShadow: "none",
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

  ///
  /// Picture uploader
  ///
  const [userPicture, setUserPicture] = useState<string>("");
  const dataOutputRef = useRef<LR.DataOutput>();

  useEffect(() => {
    window.addEventListener("LR_DONE_FLOW", (e) => {
      console.log("LR DOWN FLOW");
      if (userPicture.length !== 0) {
        // Perform upload
        console.log(`Should upload ${userPicture}`);
        setUserPicture("");
      }
    });
  }, [userPicture]);

  const dataOutput = document.querySelector("lr-data-output");
  dataOutput?.addEventListener("lr-data-output", (e: any) => {
    setUserPicture(e.detail?.data[0]?.cdnUrl ?? "");
  });

  return (
    <WelcomePageTemplate
      header={getHeader()}
      body={getBody(
        register,
        handleSubmit,
        signUpError,
        dispatch,
        formErrors,
        navigate,
        dataOutputRef,
        userPicture
      )}
      footer={getFooter(navigate)}
    />
  );
};