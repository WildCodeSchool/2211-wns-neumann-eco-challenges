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
import { useEffect, useState } from "react";
import { Avatar, Badge } from "@mui/material";
import { Edit, Face } from "@mui/icons-material";

LR.registerBlocks(LR);

const showFileUploader = (isVisible: boolean) => {
  if (isVisible) {
    const ctxProvider: UploadCtxProvider =
      document.querySelector("#uploaderctx")!;
    ctxProvider.initFlow();
  }
};

const minPasswordLength = 8;
const getHeader = () => {
  return <GreenMatesLogo format="graphic" size="100px" />;
};

const getAvatar = (userPicture: string) => {
  if (userPicture.length === 0)
    return (
      <Face
        style={{
          width: "65px",
          height: "65px",
          color: "#212121",
        }}
      />
    );
  else
    return (
      <Avatar sx={{ width: "100px", height: "100px" }} src={userPicture} />
    );
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
  userPicture: string
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
            thunkSignUp({
              email,
              firstName,
              lastName,
              password,
              picture:
                userPicture.length === 0
                  ? `https://ui-avatars.com/api/?size=128&name=${firstName}+${lastName}&rounded=true&background=f8fffc&color=212121`
                  : userPicture,
            })
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

      <div
        style={{
          flexBasis: "55px",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          paddingBottom: "14px",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "18px",
                border: "2px solid white",
                boxShadow: "inset 0px 0px 0px 2px black",
              }}
            >
              <Edit sx={{ fontSize: "15px" }} />
            </div>
          }
        >
          <Avatar
            style={{
              border: "4px solid #3bd8a9",
              width: "100px",
              height: "100px",
              backgroundColor: "#f8fffc",
            }}
            onClick={() => {
              showFileUploader(true);
            }}
          >
            {getAvatar(userPicture)}
          </Avatar>
        </Badge>
      </div>
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

        <lr-config
          ctx-name="my-uploader"
          pubkey={process.env.REACT_APP_UPLOADCARE_PUB_KEY}
          imgOnly={true}
          multiple={false}
          confirm-upload={true}
          removeCopyright={true}
          source-list="local, camera"
        ></lr-config>

        <lr-upload-ctx-provider
          id="uploaderctx"
          ctx-name="my-uploader"
        ></lr-upload-ctx-provider>

        <div style={{ width: 0, height: 0, opacity: 0 }}>
          <lr-file-uploader-regular
            class="my-config"
            ctx-name="my-uploader"
            css-src={"/uploader.css"}
          ></lr-file-uploader-regular>
        </div>
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

  useEffect(() => {
    window.addEventListener("LR_DATA_OUTPUT", (e: any) => {
      setUserPicture(e.detail?.data[0]?.cdnUrl ?? "");
    });
    window.addEventListener("LR_DONE_FLOW", (e) => {
      const ctxProvider: UploadCtxProvider =
        document.querySelector("#uploaderctx")!;
      ctxProvider.uploadCollection.clearAll();
    });
  }, []);

  return (
    <div>
      <WelcomePageTemplate
        header={getHeader()}
        body={getBody(
          register,
          handleSubmit,
          signUpError,
          dispatch,
          formErrors,
          navigate,
          userPicture
        )}
        footer={getFooter(navigate)}
      />
    </div>
  );
};
