import Stack from "@mui/material/Stack";
import { ScheduledChallengeItem } from "../challenge/ScheduledChallengeItem";
import { getFilteredChallenges } from "../../tools/challenge.tools";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { useEffect } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";

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
      {getFilteredChallenges(challenges, "scheduled").map(
        (challengeDetails) => (
          <ScheduledChallengeItem
            id={challengeDetails.challenge.id}
            key={challengeDetails.challenge.id}
            name={challengeDetails.challenge.name}
            attendees={challengeDetails.participatingChallengers}
            endingDateTime={challengeDetails.challenge.endingDate}
            startingDateTime={challengeDetails.challenge.startingDate}
            expectedAttendees={challengeDetails.invitedChallengers}
          />
        )
      )}
    </Stack>
  );
};
