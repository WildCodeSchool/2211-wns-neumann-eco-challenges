import { CardActionArea, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { OngoingChallengeItemProps } from "../../interfaces/challenge/challenge.interface";
import { ChallengeTimer } from "./ChallengeTimer";

export const OngoingChallengeItem = ({
  name,
  completion,
  ranking,
  startingDateTime,
  endingDateTime,
  backgroundColor,
}: OngoingChallengeItemProps) => {
  return (
    <Card
      className={backgroundColor}
      style={{
        width: 130,
        height: 160,
        borderRadius: 15,
      }}
    >
      <CardActionArea
        className="challengeItemContainer"
        sx={{ height: "100%" }}
        onClick={() => {}}
      >
        <Stack
          padding={1}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="paddingOngoingChallengeItem">
            <Typography
              fontWeight={700}
              style={{
                color: "white",
                overflow: "hidden",
                height: "70px",
                textShadow: "rgba(0,0,0,0.3) 0 1px 3px",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              {completion}%
            </Typography>
          </div>
          <Typography
            textAlign="center"
            fontWeight={700}
            width={"100%"}
            style={{ color: "rgba(255,255,255, 0.50)" }}
            fontSize={40}
          >
            {ranking}th
          </Typography>
          <ChallengeTimer
            {...{
              endingDateTime,
              startingDateTime,
              format: "graphic",
              type: "elapsed",
            }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};
