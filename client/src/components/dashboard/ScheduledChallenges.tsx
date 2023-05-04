import Stack from "@mui/material/Stack";
import { ScheduledChallengeItem } from "../challenge/ScheduledChallengeItem";
import {
  Challenge,
  useChallengesQuery,
  useGetUserChallengeParticipationByUserIdQuery,
} from "../../gql/generated/schema";
import moment from "moment";
import { getFilteredChallenges } from "../../tools/challenge.tools";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { useEffect } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";

const attendees = [
  [10, 10],
  [1, 12],
  [4, 6],
  [0, 13],
  [0, 13],
];

export const ScheduledChallenges = () => {
  const { userId, challenges } = useAppSelector((state) => ({
    userId: state.user?.user?.id,
    challenges: state.challenges.scheduledChallenges,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getChallenges = async () => {
      dispatch(thunkGetUserChallenges(userId!));
    };
    getChallenges();
  }, []);

  return (
    <Stack spacing={2}>
      {challenges.map((challenge) => (
        <ScheduledChallengeItem
          key={challenge.id}
          name={challenge.name}
          attendees={attendees[0][0]}
          endingDateTime={challenge.endingDate}
          startingDateTime={challenge.startingDate}
          expectedAttendees={attendees[0][1]}
        />
      ))}
    </Stack>
  );
};
