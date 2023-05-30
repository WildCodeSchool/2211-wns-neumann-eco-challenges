import { CardActionArea, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { ScheduledChallengeItemProps } from "../../interfaces/challenge/challenge.interface";
import { ChallengeTimer } from "./ChallengeTimer";
export const ScheduledChallengeItem = ({
  id,
  name,
  startingDateTime,
  endingDateTime,
  attendees,
  expectedAttendees,
}: ScheduledChallengeItemProps) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={4} className="challengeItemContainer">
      <CardActionArea
        className="challengeItemContainer"
        onClick={() => navigate(`/challenge/${id}`)}
      >
        <Stack direction="row" marginY={1.5} marginX={2}>
          <div className="lightGreenLeftBorder"></div>
          <Grid container ml={2} rowGap={1}>
            <Grid xs={12}>
              <Typography
                variant="h6"
                fontWeight={"600"}
                className="lightTextColor"
              >
                {name}
              </Typography>
            </Grid>
            <Grid xs={5}>
              <Stack>
                <Typography
                  fontSize={12}
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
                  <ChallengeTimer
                    {...{
                      endingDateTime,
                      startingDateTime,
                      format: "text",
                      type: "untilBeginning",
                    }}
                  />
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <Stack>
                <Typography
                  fontSize={12}
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
                  <ChallengeTimer
                    {...{
                      endingDateTime,
                      startingDateTime,
                      format: "text",
                      type: "duration",
                    }}
                  />
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack>
                <Typography
                  fontSize={12}
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
                  {`${attendees}/${expectedAttendees}`}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          {/* <Stack justifyContent={"center"}>&gt;</Stack> */}
        </Stack>
      </CardActionArea>
    </Paper>
  );
};
