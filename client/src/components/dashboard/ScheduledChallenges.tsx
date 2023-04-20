import Stack from "@mui/material/Stack";
import { ScheduledChallengeItem } from "../challenge/ScheduledChallengeItem";
import { useChallengesQuery } from "../../gql/generated/schema";
import moment from "moment";

const attendees = [
  [10, 10],
  [1, 12],
  [4, 6],
  [0, 13],
  [0, 13],
];

export const ScheduledChallenges = () => {
  const { data } = useChallengesQuery();
  const challenges = data?.challenges || [];
  return (
    <Stack spacing={2}>
      {challenges.map((challenge) => (
        <ScheduledChallengeItem
          key={challenge.id}
          name={challenge.name}
          attendees={attendees[0][0]}
          endingDateTime={moment(challenge.endingDate).utc()}
          startingDateTime={moment(challenge.startingDate).utc()}
          expectedAttendees={attendees[0][1]}
        />
      ))}
    </Stack>
  );
};
