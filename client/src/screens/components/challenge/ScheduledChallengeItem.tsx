import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
export const ScheduledChallengeItem = () => {
  return (
    <Paper elevation={5} className="challengeItemContainer">
      <Stack direction="row" marginY={1.5} marginX={2}>
        <div className="lightGreenLeftBorder"></div>
        <Grid container ml={2} rowGap={1}>
          <Grid xs={12}>
            <Typography
              variant="h6"
              fontWeight={"600"}
              className="lightTextColor"
            >
              Bike repairing contest
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Stack>
              <Typography
                variant="subtitle2"
                fontWeight={"600"}
                className="greyTextColor"
                lineHeight={0.5}
              >
                Starting in
              </Typography>
              <Typography
                variant="h6"
                className="greyTextColor"
                fontWeight={"600"}
              >
                03m11s
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={4}>
            <Stack>
              <Typography
                variant="subtitle2"
                fontWeight={"600"}
                className="greyTextColor"
                lineHeight={0.5}
              >
                Duration
              </Typography>
              <Typography
                variant="h6"
                className="greyTextColor"
                fontWeight={"600"}
              >
                30m00s
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={4}>
            <Stack>
              <Typography
                variant="subtitle2"
                fontWeight={"600"}
                className="greyTextColor"
                lineHeight={0.5}
              >
                Attendees
              </Typography>
              <Typography
                variant="h6"
                className="greyTextColor"
                fontWeight={"600"}
              >
                5/32
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack justifyContent={"center"}>&gt;</Stack>
      </Stack>
    </Paper>
  );
};
