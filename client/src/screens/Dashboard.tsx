import Stack from "@mui/material/Stack";
import React from "react";

import { DashboardWrapper } from "./components/DashboardWrapper";
import { FriendInvitation } from "./components/FriendInvitation";
import { HeaderScreen } from "./components/HeaderScreen";
import { OngoingChallenges } from "./components/OngoingChallenges";
import { ScheduledChallenges } from "./components/ScheduledChallenges";
export const Dashboard = () => {
  return (
    <Stack spacing={3}>
      <HeaderScreen subtitle="Dashboard" title="Green Mates" />

      <DashboardWrapper
        title={"On going challenges"}
        subtitle={"Save the planet while having fun! 🔥"}
        component={<OngoingChallenges />}
      />
      <DashboardWrapper
        title={"Incoming challenges"}
        subtitle={"Prepare yourself! 🗑️🧽🫧"}
        component={<ScheduledChallenges />}
      />
      <DashboardWrapper
        title={"Contest your friend!"}
        subtitle={"Don't be shy they gonna love it"}
        component={<FriendInvitation />}
      />
    </Stack>
  );
};
