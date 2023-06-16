import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import parse from "html-react-parser";
import moment from "moment";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import GamesRoundedIcon from "@mui/icons-material/GamesRounded";
import {
  Notification,
  NotificationStatus,
  useUpdateNotificationMutation,
} from "../../gql/generated/schema";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

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

export const NotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const [updatedNotification, setUpdatedNotification] = useState(notification);
  useEffect(() => {
    console.log(notification);

    setUpdatedNotification(notification);
  }, [notification]);
  const [updateNotification] = useUpdateNotificationMutation();

  const hasBeenClicked = async (type: string) => {
    const data = await updateNotification({
      variables: {
        notificationId: notification.id,
        status:
          type === "accepted"
            ? NotificationStatus.Accepted
            : NotificationStatus.Declined,
      },
    });
    if (data.data != null) {
      setUpdatedNotification(data.data?.updateNotificationStatus);
    }
  };

  return (
    <Paper elevation={2}>
      <Grid
        container
        paddingY={2}
        sx={{
          border: "1px solid",
          borderColor: grey[200],
          borderRadius: "4px",
        }}
      >
        <Grid
          item
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"-1.5em"}
        >
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
          {updatedNotification.status !== NotificationStatus.Pending && (
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
                <Button onClick={() => hasBeenClicked("accept")}>Accept</Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => hasBeenClicked("decline")}>
                  Decline
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"-1.5em"}
        >
          {getIcon(notification.type!)}
        </Grid>
      </Grid>
    </Paper>
  );
};
