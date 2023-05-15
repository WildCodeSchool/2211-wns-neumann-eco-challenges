import { Button, ButtonGroup, Stack } from "@mui/material";
import { HeaderScreen } from "../components/menu/HeaderScreen";
import { ClosingButton } from "../components/notification/ClosingButton";
import { motion } from "framer-motion";
import { Notifications } from "../components/notification/Notifications";

export const NotificationsCenter = () => {
  return (
    <motion.div initial={{ translateX: "100%" }} animate={{ translateX: "0" }}>
      <Stack gap={4} className="notificationsContainer">
        <HeaderScreen
          title="Notifications"
          subtitle=""
          component={<ClosingButton />}
          reversed
        />

        <Notifications />
      </Stack>
    </motion.div>
  );
};
