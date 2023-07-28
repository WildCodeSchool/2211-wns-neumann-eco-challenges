import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import { useEffect, useState } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import useLongPress from "../../hooks/useLongPress";
import { EmojiBar } from "../common/EmojiBar";
import React from "react";
import { useGetUserChallengeReactionQuery } from "../../gql/generated/schema";
import { Stack } from "@mui/material";

const classes = [
  "nightLinearGradient",
  "sunsetLinearGradient",
  "pinkLinearGradient",
  "seaLinearGradient",
];

export const OngoingChallenges = () => {
  const [openEmojiBar, setopenEmojiBar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [onGoingChallengeId, setOnGoingChallengeId] = useState<string>("");

  const onLongPress = useLongPress<HTMLElement>({
    onLongPress(e) {
      setopenEmojiBar(true);
      setAnchorEl(e.currentTarget);
      setOnGoingChallengeId(e.currentTarget.ariaLabel!);
    },
  });

  const handleClose = () => {
    setopenEmojiBar(false);
  };

  const { userId, challenges } = useAppSelector((state) => ({
    userId: state.user?.user?.id,
    challenges: state.challenges.onGoingChallenges,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getChallenges = async () => {
      dispatch(thunkGetUserChallenges(userId!));
    };
    getChallenges();
  }, [dispatch, userId]);

  const { data: userReaction } = useGetUserChallengeReactionQuery({
    variables: { challengeId: onGoingChallengeId },
  });

  console.log(userReaction);

  return (
    <>
      <ImageList
        sx={{
          paddingBottom: 1,
          gridAutoFlow: "column",
          width: "90vw",
          maxWidth: "900px !important",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
          gridAutoColumns: "minmax(150px, 1fr)",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {challenges.map((challengeDetails, index) => {
          return (
            <div aria-label={challengeDetails.challenge.id} {...onLongPress}>
              <OngoingChallengeItem
                key={challengeDetails.challenge.id}
                {...{
                  id: challengeDetails.challenge.id,
                  name: challengeDetails.challenge.name,
                  backgroundColor: classes[index % classes.length],
                  ranking: challengeDetails.rank + 1,
                  endingDateTime: challengeDetails.challenge.endingDate,
                  startingDateTime: challengeDetails.challenge.startingDate,
                  completion: challengeDetails.completionPercentage,
                }}
              />
            </div>
          );
        })}
      </ImageList>
      {/* {userReaction ? (
        <Stack>
          {userReaction.getUserChallengeReaction.map((x) => x.content)}
        </Stack>
      ) : ( */}
      <EmojiBar
        anchorEl={anchorEl || undefined}
        openEmojiBar={openEmojiBar}
        onClose={handleClose}
        onGoingChallengeId={onGoingChallengeId}
        userId={userId!}
      />
      {/* )} */}
    </>
  );
};
