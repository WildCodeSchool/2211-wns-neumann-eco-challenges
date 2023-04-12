import Stack from "@mui/material/Stack";
import React from "react";

import { DashboardWrapper } from "../components/dashboard/DashboardWrapper";
import { FriendInvitation } from "../components/dashboard/FriendInvitation";
import { HeaderScreen } from "../components/menu/HeaderScreen";
import { OngoingChallenges } from "../components/dashboard/OngoingChallenges";
import { ScheduledChallenges } from "../components/dashboard/ScheduledChallenges";
export const Dashboard = () => {
  return (
    <Stack gap={4}>
      <Stack marginBottom={7}>
        <HeaderScreen subtitle="Dashboard" title="Green Mates" />
      </Stack>
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
        subtitle={"Don't be shy they gonna love it 😍"}
        component={<FriendInvitation />}
      />
    </Stack>
  );
};
