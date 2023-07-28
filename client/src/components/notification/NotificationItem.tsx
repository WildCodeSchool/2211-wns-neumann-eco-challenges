import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import parse from "html-react-parser";
import moment from "moment";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import GamesRoundedIcon from "@mui/icons-material/GamesRounded";
<<<<<<< Updated upstream
import {
  Notification,
  NotificationStatus,
  useUpdateNotificationMutation,
} from "../../gql/generated/schema";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../reducer/hooks";
import { setEvent } from "../../reducer/event/event.reducer";
=======
import { Notification } from "../../gql/generated/schema";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { motion } from "framer-motion";
>>>>>>> Stashed changes

const notificationConfigs = {
  challenge_invitation: {
    iconClassName: "bgPeachColor",
  },
  friend_invitation: {
    iconClassName: "bgYellowColor",
  },
};

const getIcon = (type: string) => {
  switch (type) {
    case "friend_invitation":
      return (
        <Avatar
          sx={{ width: 30, height: 30 }}
          className={`${notificationConfigs[type].iconClassName}`}
        >
          <FaceRoundedIcon sx={{ width: 20, height: 20 }} />
        </Avatar>
      );
    case "challenge_invitation":
      return (
        <Avatar
          sx={{ width: 30, height: 30 }}
          className={`${notificationConfigs[type].iconClassName}`}
        >
          <GamesRoundedIcon sx={{ width: 20, height: 20 }} />
        </Avatar>
      );
    default:
      return null;
  }
};
<<<<<<< Updated upstream
const avatars = [
  "https://images.prismic.io/utopix-next-website/Mzk0NGJkOWEtY2ZlYS00MjVjLTkwNTAtOGY5OWQzN2IzNGVi_762cec57-2eaf-4eaf-9a0d-2e7860147e48_profilhomme7.jpg?ixlib=js-3.7.1&w=3840&auto=format&fit=max",
  "https://www.informelles.media/wp-content/uploads/2022/05/Alice-Lhabouz-Couleur-HD-scaled.jpg",
  "https://ca.slack-edge.com/TGU64F2H2-U04DJ3K2QTG-fbaa52a9366f-512",
];
=======
>>>>>>> Stashed changes

export const NotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
<<<<<<< Updated upstream
  const [updateNotification] = useUpdateNotificationMutation();
  const dispatch = useAppDispatch();

  const onNotificationAnswerButtonClicked = async (
    status: NotificationStatus
  ) => {
    try {
      await updateNotification({
        variables: {
          notificationId: notification.id,
          status,
        },
      });
    } catch (error) {
      dispatch(
        setEvent({
          id: "updateFriendRelationshipStatus",
          title: "Ouch !",
          body: "We couldn't find your friend request.",
        })
      );
=======
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const hasBeenClicked = (type: string) => {
    if (type === "accept") {
      setIsAccepted(true);
    }
    if (type === "decline") {
      setIsDeclined(true);
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <Paper
      elevation={0}
      sx={{
        borderRadius: "12px",
      }}
    >
      <Grid
        container
        paddingY={2}
        minHeight={"100px"}
        sx={{
          border: "1px solid",
          borderColor: "rgba(160,160,160, 0.25)",
          borderRadius: "inherit",
=======
    <Paper elevation={2}>
      <Grid
        container
        paddingY={2}
        sx={{
          border: "1px solid",
          borderColor: grey[200],
          borderRadius: "4px",
>>>>>>> Stashed changes
        }}
      >
        <Grid
          item
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
<<<<<<< Updated upstream
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={avatars[Math.floor(Math.random() * (avatars.length - 0) + 0)]}
          ></Avatar>
        </Grid>
        <Grid item xs={7} display={"flex"} direction={"column"}>
          <Grid item xs={12} display={"flex"} alignItems={"flex-end"}>
            <Typography variant="caption" color={grey["700"]}>
              {moment(notification?.date).format("dddd DD MMMM YYYY hh:mm")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {parse(notification.content)}
            </Typography>
          </Grid>
          {notification.status === NotificationStatus.Pending && (
            <Grid
              item
              xs={12}
              flexDirection={"row"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={1}
            >
              <Grid item xs={6}>
                <Button
                  variant={"smallActionButton"}
                  onClick={() =>
                    onNotificationAnswerButtonClicked(
                      NotificationStatus.Accepted
                    )
                  }
                >
                  Accept
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={"smallActionButton"}
                  onClick={() =>
                    onNotificationAnswerButtonClicked(
                      NotificationStatus.Declined
                    )
                  }
                >
                  Decline
                </Button>
              </Grid>
            </Grid>
          )}
=======
          <Avatar sx={{ width: 56, height: 56 }} src={undefined}></Avatar>
        </Grid>
        <Grid item xs={7}>
          <Grid item xs={12}>
            <Typography variant="caption">
              {moment(notification?.date).format("dddd DD MMMM YYYY hh:mm")}
            </Typography>
          </Grid>
          <Grid item xs={12} marginBottom={"0.3em"}>
            {parse(notification.content)}
          </Grid>

          <Grid
            item
            xs={12}
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={1}
          >
            {!isAccepted && !isDeclined && (
              <>
                <Grid item xs={5}>
                  <Button onClick={() => hasBeenClicked("accept")}>
                    Accept
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button onClick={() => hasBeenClicked("decline")}>
                    Decline
                  </Button>
                </Grid>
              </>
            )}
            {isAccepted && (
              <motion.div
                initial={{ translateY: "100%" }}
                animate={{ translateY: "0" }}
              >
                <Button disabled className="activeButtonValidate">
                  Accpeted
                </Button>
              </motion.div>
            )}
            {isDeclined && (
              <motion.div
                initial={{ translateY: "100%" }}
                animate={{ translateY: "0" }}
              >
                <Button disabled className="activeButtonDecline">
                  Declined
                </Button>
              </motion.div>
            )}
          </Grid>
>>>>>>> Stashed changes
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
<<<<<<< Updated upstream
          {getIcon(notification.type!)}
=======
          {getIcon(notification.type)}
>>>>>>> Stashed changes
        </Grid>
      </Grid>
    </Paper>
  );
};
