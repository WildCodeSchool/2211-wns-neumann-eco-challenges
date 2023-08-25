import { Card, Stack, Badge, Typography } from "@mui/material";
import { User } from "../../gql/generated/schema";

export const ChallengerRankingItem = ({
  score,
  totalScore,
  challenger,
  rank,
}: {
  score: number;
  rank: number;
  totalScore: number;
  challenger: User;
}) => {
  const getChallengeCompletionPercent = (score: number, totalScore: number) =>
    ((score / totalScore) * 100.0).toString();
  return (
    <Card
      elevation={0}
      sx={{
        padding: "10px 10px 10px 10px",
        height: "60px",
        borderRadius: "14px",
        border: "1px solid #F1F1F1",
      }}
    >
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        spacing={1}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          badgeContent={rank}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
              fontWeight: 600,
            },
          }}
        >
          {" "}
          <img
            src={challenger.picture!}
            alt="avatar"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "7px",
              objectFit: "cover",
            }}
          />
        </Badge>
        <Stack flex={1}>
          <Typography color={"#585656"} fontWeight={600}>
            {challenger.firstName}
          </Typography>
          <Typography color={"#9D9C9C"} variant="body2">
            {`${score} point${score > 0 ? "s" : ""}`}
          </Typography>
          <div
            style={{
              position: "relative",
              height: "10px",
              width: "100%",
              backgroundColor: "#F0F0F0",
              borderRadius: "3px",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "10px",
                width: `${getChallengeCompletionPercent(score, totalScore)}%`,
                borderRadius: "3px",
                backgroundColor: "#3BD8A9",
              }}
            ></div>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
};
