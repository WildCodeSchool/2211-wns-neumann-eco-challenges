import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import { useEffect } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";

const classes = [
  "nightLinearGradient",
  "sunsetLinearGradient",
  "pinkLinearGradient",
  "seaLinearGradient",
];

export const OngoingChallenges = () => {
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
  }, []);
  return (
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
        );
      })}
    </ImageList>
  );
};
