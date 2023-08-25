import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import {
  ReactionEmojis,
  ReactionEmojisWithIcon,
  useCreateOrUpdateUserChallengeReactionMutation,
  useDeleteUserChallengeReactionMutation,
  UserChallengeReaction,
} from "../../gql/generated/schema";
import { Emoji } from "../common/Emoji";
import { motion } from "framer-motion";
import { Avatar, Typography } from "@mui/material";
import { avatars, colors } from ".././friend/FriendInvitationEnhanced";
import { useAppSelector } from "../../reducer/hooks";

interface EmojiBarProps {
  challengeReactions: UserChallengeReaction[];
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
  challengeReactions,
}: EmojiBarProps) => {
  const contextUserId = useAppSelector((store) => store.user.user!.id);
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
    <>
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

      <Popover
        open
        onClose={onClose}
        anchorEl={anchorEl}
        sx={{
          "& .MuiPaper-root": {
            marginTop: "100px",
            backgroundColor: "#242E34",
            height: "50px",
            borderRadius: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10px",
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
          spacing={1}
          alignItems="center"
          sx={{
            backgroundColor: "inherit",
            borderRadius: "inherit",
          }}
        >
          {challengeReactions
            .filter((reaction) => reaction.userId !== contextUserId)
            .map((reaction, index) => {
              const emoji = reactionEmojis.find(
                (emoji) => emoji.reactionEmoji === reaction.content
              );
              return (
                emoji && (
                  <>
                    <Avatar
                      style={{
                        border: `2px solid ${colors[index % colors.length]}`,
                        width: "30px",
                        height: "30px",
                      }}
                      src={avatars[index % avatars.length]}
                    />
                    <Typography color="white" fontWeight="bold">
                      {reaction.user.firstName}
                    </Typography>
                    <Emoji symbol={emoji.icon} label={emoji.reactionEmoji} />
                  </>
                )
              );
            })}
        </Stack>
      </Popover>
    </>
  );
};
