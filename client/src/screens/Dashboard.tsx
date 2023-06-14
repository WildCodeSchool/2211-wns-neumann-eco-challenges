import Stack from "@mui/material/Stack";
import { v4 as uuid } from "uuid";
import { DashboardWrapper } from "../components/dashboard/DashboardWrapper";
import { HeaderScreen } from "../components/menu/HeaderScreen";
import { OngoingChallenges } from "../components/dashboard/OngoingChallenges";
import { ScheduledChallenges } from "../components/dashboard/ScheduledChallenges";
import { NotificationsCenterButton } from "../components/notification/NotificationsCenterButton";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { useAppSelector } from "../reducer/hooks";
import handshake from "../assets/lotties/handshake.json";
import { ScrollTopScreen } from "./ScrollTopScreen";
import { FriendInvitationEnhanced } from "../components/friend/FriendInvitationEnhanced";
import { FriendInvitation } from "../components/dashboard/FriendInvitation";
export const Dashboard = () => {
  const { firstName } = useAppSelector((state: any) => state.user.user);

  return (
    <motion.div
      initial={{ translateX: "-100%" }}
      animate={{
        translateX: "0",
      }}
    >
      <Stack gap={4}>
        <Stack marginBottom={7}>
          <HeaderScreen
            subtitle="Dashboard"
            title={`Hello ${firstName ?? ""}`}
            gapBtwTitleAndAfterComponent={0}
            afterTitleComponent={
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: handshake,
                }}
                height={50}
                width={50}
              />
            }
            component={
              <ScrollTopScreen
                key={uuid()}
                screen={<NotificationsCenterButton />}
              />
            }
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
