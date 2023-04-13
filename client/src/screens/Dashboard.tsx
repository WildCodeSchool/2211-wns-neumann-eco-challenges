import Stack from "@mui/material/Stack";
import React from "react";

import { DashboardWrapper } from "../components/dashboard/DashboardWrapper";
import { FriendInvitation } from "../components/dashboard/FriendInvitation";
import { HeaderScreen } from "../components/menu/HeaderScreen";
import { OngoingChallenges } from "../components/dashboard/OngoingChallenges";
import { ScheduledChallenges } from "../components/dashboard/ScheduledChallenges";
import { NotificationsCenterButton } from "../components/notification/NotificationsCenterButton";
import { motion } from "framer-motion";
export const Dashboard = () => {
  return (
    <motion.div
      initial={{ translateX: "-100%" }}
      animate={{ translateX: "0", transitionDuration: "0.1s" }}
    >
      <Stack gap={4}>
        <Stack marginBottom={7}>
          <HeaderScreen
            subtitle="Dashboard"
            title="Green Mates"
            component={<NotificationsCenterButton />}
          />
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
    </motion.div>
  );
};
