import { Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";

export const OngoingChallengeItem = ({ type }: { type: number }) => {
  const getClassName = (type: number) => {
    switch (type) {
      case 0:
        return "nightLinearGradient";
      case 1:
        return "sunsetLinearGradient";
      case 2:
        return "pinkLinearGradient";
      case 3:
        return "seaLinearGradient";
      default:
        return "nightLinearGradient";
    }
  };
  return (
    <Card
      className={getClassName(type)}
      style={{
        width: 130,
        height: 160,
        borderRadius: 15,
      }}
    >
      <Stack
        padding={1}
        height="100%"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          className="challengeTimer"
          style={{
            backgroundImage:
              "conic-gradient(rgba(255,255,255,0.5) 64%, rgba(0,0,0,0) 17%)",
          }}
        ></div>
        <div className="paddingOngoingChallengeItem">
          <Typography
            fontWeight={700}
            style={{ color: "white", textShadow: "rgba(0,0,0,0.3) 0 1px 3px" }}
          >
            Clean streeet hell yeah
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            99%
          </Typography>
        </div>
        <Typography
          textAlign="center"
          fontWeight={700}
          width={"100%"}
          style={{ color: "rgba(255,255,255, 0.50)" }}
          fontSize={40}
        >
          25th
        </Typography>
      </Stack>
    </Card>
  );
};
