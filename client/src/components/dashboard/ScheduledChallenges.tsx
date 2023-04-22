import Stack from "@mui/material/Stack";
import { ScheduledChallengeItem } from "../challenge/ScheduledChallengeItem";
import { useChallengesQuery } from "../../gql/generated/schema";
import moment from "moment";
import { getFilteredChallenges } from "../../tools/challenge.tools";

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
      {getFilteredChallenges(challenges, "scheduled").map((challenge) => (
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
