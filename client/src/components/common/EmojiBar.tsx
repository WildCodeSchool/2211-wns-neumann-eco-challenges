import { Stack } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { useCreateUserChallengeReactionMutation } from "../../gql/generated/schema";

import { Emoji, ORDERED_EMOJI } from "./Emoji";

interface EmojiBarProps {
  openEmojiBar: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement;
  onGoingChallengeId: string;
  userId: string;
}

export const EmojiBar = ({
  openEmojiBar,
  onClose,
  anchorEl,
  onGoingChallengeId,
  userId,
}: EmojiBarProps) => {
  const [clickedContent, setClickedContent] = useState<string>("");
  const [createReaction] = useCreateUserChallengeReactionMutation({
    variables: {
      challengeId: onGoingChallengeId,
      userId: userId,
      content: clickedContent,
    },
  });

  return (
    <Popover
      open={openEmojiBar}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {ORDERED_EMOJI.map((emoji) => {
        return (
          <Stack
            sx={{ display: "inline" }}
            onClick={() => {
              setClickedContent(emoji);
              if (clickedContent !== "") createReaction();
            }}
          >
            <Emoji symbol={emoji} label={emoji} />
          </Stack>
        );
      })}
    </Popover>
  );
};
