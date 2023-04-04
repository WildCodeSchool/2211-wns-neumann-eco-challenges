import Stack from "@mui/material/Stack";
import moment from "moment";
import momentTZ from "moment-timezone";
import { ScheduledChallengeItem } from "./challenge/ScheduledChallengeItem";

const names = [
  "Green walking 17e Paris",
  "Green walking 18e Paris",
  "Green walking 20e Paris",
  "Green walking 3e Lyon",
  "Green walking 1er Lyon",
];
const attendees = [
  [10, 10],
  [1, 12],
  [4, 6],
  [0, 13],
  [0, 13],
];

const challengeTime = [
  [momentTZ().utc().add(1, "day"), momentTZ().utc().add(2, "day")],
  [momentTZ().utc().add(1, "hour"), momentTZ().utc().add(3, "hour")],
  [momentTZ().utc().add(47, "minute"), momentTZ().utc().add(56, "minute")],
  [momentTZ().utc().add(30, "seconds"), momentTZ().utc().add(2, "month")],
  [momentTZ().utc().add(2, "month"), momentTZ().utc().add(2, "month")],
];
export const ScheduledChallenges = () => {
  return (
    <Stack spacing={2}>
      {Array.from(Array(names.length).keys()).map((_, index) => (
        <ScheduledChallengeItem
          key={index}
          name={names[index]}
          attendees={attendees[index][0]}
          endingDateTime={challengeTime[index][1]}
          startingDateTime={challengeTime[index][0]}
          expectedAttendees={attendees[index][1]}
        />
      ))}
    </Stack>
  );
};
