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

interface EmojiBarProps {
  reactionEmojis: ReactionEmojisWithIcon[];
  onClose: () => void;
  anchorEl: HTMLElement;
  selectedChallengeId: string;
  userId: string;
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
  userId,
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
          height: "50px",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          overflowX: "scroll",
          overflowY: "hidden",
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
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
    </Popover>
  );
};
