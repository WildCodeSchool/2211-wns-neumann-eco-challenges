import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import {
  ReactionEmojis,
  ReactionEmojisWithIcon,
  useCreateOrUpdateUserChallengeReactionMutation,
  useDeleteUserChallengeReactionMutation,
} from "../../gql/generated/schema";
import { Emoji } from "../common/Emoji";
import { motion } from "framer-motion";
import React from "react";
import { Avatar, Typography } from "@mui/material";

let REACTION_NB = 3;
const names = [
  "Nicolas",
  "Luc",
  "Sylvie",
  "Nina",
  "Thomas",
  "Timothée",
  "Sophie",
  "Tomoa",
];
interface EmojiBarProps {
  reactionEmojis: ReactionEmojisWithIcon[];
  onClose: () => void;
  anchorEl: HTMLElement;
  selectedChallengeId: string;
  initialReaction?: ReactionEmojis;
}

const emojiSelectionVariants = {
  active: {
    scale: 1.3,
  },
  inactive: {
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export const EmojiBar = ({
  reactionEmojis,
  onClose,
  anchorEl,
  selectedChallengeId,
  initialReaction,
}: EmojiBarProps) => {
  const [selectedReaction, setSelectedReaction] = useState<
    ReactionEmojis | undefined
  >(initialReaction);
  const [createOrUpdateReaction] =
    useCreateOrUpdateUserChallengeReactionMutation();
  const [deleteReaction] = useDeleteUserChallengeReactionMutation();

  const [reactionUpdated, setReactionUpdated] = useState<boolean>(false);

  const onReactionSelected = async (reaction: ReactionEmojis) => {
    if (selectedReaction == null || reaction !== selectedReaction) {
      try {
        setSelectedReaction(reaction);
        await createOrUpdateReaction({
          variables: {
            challengeId: selectedChallengeId,
            content: reaction,
          },
        });
      } catch (error) {
        setSelectedReaction(selectedReaction);
      }
    } else {
      try {
        await deleteReaction({
          variables: {
            challengeId: selectedChallengeId,
          },
        });
        setSelectedReaction(undefined);
      } catch (error) {
        setSelectedReaction(selectedReaction);
      }
    }
    setReactionUpdated(true);
  };

  return (
    <Popover
      open
      onClose={onClose}
      anchorEl={anchorEl}
      sx={{
        "& .MuiPaper-root": {
          marginTop: "20px",
          backgroundColor: "#242E34",
          minHeight: "50px",

          borderRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: REACTION_NB === 0 ? "10px 0 10px 0" : "15px",
          overflowX: "scroll",
          overflowY: "hidden",
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Stack direction="column">
        <Stack
          direction="row"
          display={"flex"}
          spacing={2}
          sx={{
            backgroundColor: "inherit",
            borderRadius: "inherit",
          }}
        >
          {reactionEmojis.map((reaction, index) => {
            return (
              <motion.div
                key={index}
                variants={emojiSelectionVariants}
                animate={
                  reaction.reactionEmoji === selectedReaction
                    ? "active"
                    : "inactive"
                }
                transition={{ type: "spring", bounce: 0.6, duration: 0.4 }}
                onAnimationComplete={(_) => {
                  if (reactionUpdated) onClose();
                }}
                onClick={() => {
                  onReactionSelected(reaction.reactionEmoji);
                }}
              >
                <Emoji symbol={reaction.icon} label={reaction.icon} />
              </motion.div>
            );
          })}
        </Stack>
        {REACTION_NB !== 0 && (
          <Stack spacing={2} marginTop={1}>
            <Typography variant="subtitle1" color={"white"} fontWeight={"600"}>
              Reactions
            </Typography>
            {reactionEmojis.slice(0, REACTION_NB).map((emoji, index) => (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Avatar
                  sx={{ marginRight: "20px", height: "40px", width: "40px" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU"
                ></Avatar>
                <Typography sx={{ flex: 1 }} color="white" fontWeight={600}>
                  {names[index]}
                </Typography>
                <Emoji symbol={emoji.icon} label={emoji.reactionEmoji} />
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Popover>
  );
};
