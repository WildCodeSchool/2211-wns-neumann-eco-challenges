import { Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import { motion } from "framer-motion";
import { WelcomeItem } from "../components/welcome/WelcomeItem";
import { useNavigate } from "react-router-dom";
import { GreenMatesLogo } from "../components/common/GreenMatesLogo";
import { useEffect, useState } from "react";
import { GreenMatesLogoPage } from "../components/common/GreenMatesLogoPage";
import { WelcomePageTemplate } from "../components/welcome/WelcomePageTemplate";
import { useAppDispatch } from "../reducer/hooks";
import { thunkGetProfile } from "../reducer/user/user.reducer";
import { RequestStatus } from "../reducer/requestStatus.enums";
import { scrollToTop } from "../tools/render.tools";

export const Welcome = () => {
  const navigate = useNavigate();
  const [showLogoPage, setShowLogoPage] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const getProfile = await dispatch(thunkGetProfile());
      // We get profile from cookie or plain token
      // Redirect to dashboard
      if (getProfile.meta.requestStatus === RequestStatus.fulfilled)
        navigate("/dashboard");
      setShowLogoPage(false);
    }, 2000);
  }, []);

  const getHeader = () => {
    return <GreenMatesLogo format="text" />;
  };

  const getBody = (navigate: any) => {
    return (
      <Grid
        flex={3}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
      >
        <Grid
          width={"100%"}
          item
          flex={4}
          display={"flex"}
          justifyContent={"center"}
          sx={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            animate={{
              translateX: [
                "0%",
                "0%",
                "-100%", // 0
                "-100%", // 3 sec
                "-200%", // 3.1 sec
                "-200%", // 6 sec
                "-100%", // 6.1 sec
                "-100%", // 9 sec
                "0%",
                "0%",
              ],
            }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              times: [0.0, 0.2, 0.21, 0.4, 0.41, 0.6, 0.61, 0.8, 0.81, 1],
              // delayChildren: 3,
              repeat: Infinity,
            }}
            style={{
              display: "inline-flex",
              width: "100%",
            }}
          >
            <WelcomeItem
              color="aubergine"
              description="Challenge your friends and push yourself to the very top!"
              title="Challenge"
              name="podium"
            />
            <WelcomeItem
              color="neonGreen"
              description="Have fun while making the planet greener!"
              title="Be proactive"
              name="ecology"
            />
            <WelcomeItem
              color="peach"
              description="Complete eco-gestures while discovering the surroundings!"
              title="Explore"
              name="journey"
            />
          </motion.div>
        </Grid>
        <Grid
          item
          justifyContent={"center"}
          alignItems={"flex-start"}
          display={"flex"}
          flex={1}
          padding={0}
        >
          <Button
            onClick={() => navigate("/signup")}
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
            Get started
          </Button>
        </Grid>
      </Grid>
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

  return (
    <Grid>
      <div hidden={!showLogoPage}>
        <GreenMatesLogoPage />
      </div>
      <div hidden={showLogoPage}>
        <WelcomePageTemplate
          header={getHeader()}
          body={getBody(navigate)}
          footer={getFooter(navigate)}
        />
      </div>
    </Grid>
  );
};
