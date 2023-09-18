import { CardActionArea, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { OngoingChallengeItemProps } from "../../interfaces/challenge/challenge.interface";
import { ChallengeTimer } from "./ChallengeTimer";
import { useNavigate } from "react-router-dom";
import { formatRankToReadable } from "../../tools/challenge.tools";
import { motion } from "framer-motion";

export const OngoingChallengeItem = ({
  id,
  name,
  completion,
  ranking,
  startingDateTime,
  endingDateTime,
  backgroundColor,
  reactionEmojiIcon,
  animateReaction = false,
}: OngoingChallengeItemProps) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/challenge/${id}`)}
      className={backgroundColor}
      style={{
        width: 130,
        height: 160,
        borderRadius: 15,
        overflow: "visible",
      }}
    >
      <CardActionArea
        className="challengeItemContainer"
        sx={{ height: "100%", position: "relative", overflow: "visible" }}
      >
        {reactionEmojiIcon != null && (
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              right: "-5px",
              height: "25px",
              width: "25px",
              backgroundColor: "#242E34",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid rgba(255,255,255,0.2)",
              zIndex: 5,
            }}
          >
            <motion.div
              animate={{
                scale: animateReaction ? [1, 2.5, 1] : 1,
                y: animateReaction ? [0, -30, 0] : 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {reactionEmojiIcon}
            </motion.div>
          </div>
        )}
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
            {formatRankToReadable(ranking)}
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
