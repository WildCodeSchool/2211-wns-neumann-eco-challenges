import Stack from "@mui/material/Stack";
import { ScheduledChallengeItem } from "./challenge/ScheduledChallengeItem";

export const ScheduledChallenges = () => {
  return (
    <Stack spacing={2}>
      <ScheduledChallengeItem />
      <ScheduledChallengeItem />
      <ScheduledChallengeItem />
      <ScheduledChallengeItem />
      <ScheduledChallengeItem />
    </Stack>
  );
};
