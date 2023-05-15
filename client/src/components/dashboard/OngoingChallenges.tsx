import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import { Challenge } from "../../gql/generated/schema";
import { getFilteredChallenges } from "../../tools/challenge.tools";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";
import { AppDispatch, RootState } from "../../store";
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
      }}
    >
      {challenges.map((challenge, index) => {
        return (
          <OngoingChallengeItem
            key={challenge.id}
            {...{
              name: challenge.name,
              backgroundColor: classes[index % classes.length],
              ranking: 1,
              endingDateTime: challenge.endingDate,
              startingDateTime: challenge.startingDate,
              completion: 99,
            }}
          />
        );
      })}
    </ImageList>
  );
};
