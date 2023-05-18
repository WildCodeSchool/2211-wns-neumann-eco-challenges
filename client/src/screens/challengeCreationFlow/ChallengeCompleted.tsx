import { Grid, Typography } from "@mui/material";
import Lottie from "react-lottie";
import confetti from "../../assets/lotties/confetti.json";
import confetti2 from "../../assets/lotties/confetti-2.json";

export const ChallengeCompleted = () => {
  return (
    <Grid
      container
      display={"flex"}
      height={"100vh"}
      width={"100vw"}
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: confetti2,
          rendererSettings: { preserveAspectRatio: "xMidYMin slice" },
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <Grid item textAlign={"center"}>
        {" "}
        <Typography variant="h3">🎉</Typography>
        <Typography variant={"h5"} fontWeight={600}>
          Congratulation!
        </Typography>{" "}
        <Typography variant="subtitle1">
          Good job mate. We notified your friends to join your challenge! Be
          ready to challenge them.
        </Typography>
      </Grid>
    </Grid>
  );
};
