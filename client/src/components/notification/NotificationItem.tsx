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
import { useAppDispatch } from "../../reducer/hooks";
import { setEvent } from "../../reducer/event/event.reducer";

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
    }
  };

  return (
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
        }}
      >
        <Grid
          item
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={notification.picture}
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
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {getIcon(notification.type!)}
        </Grid>
      </Grid>
    </Paper>
  );
};
