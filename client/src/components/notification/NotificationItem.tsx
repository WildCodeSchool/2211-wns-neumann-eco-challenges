import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import parse from "html-react-parser";
import moment from "moment";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import GamesRoundedIcon from "@mui/icons-material/GamesRounded";
import { grey } from "@mui/material/colors";

const notificationConfigs = {
  CHALLENGE_INVITE: {
    message: `<b>$sender$</b> wants you to join the challenge <b>$content$</b>`,
    iconClassName: "bgPeachColor",
  },
  FRIEND_INVITE: {
    message: "<b>$sender$</b> wants to be your friend.",
    iconClassName: "bgYellowColor",
  },
};

const getIcon = (type: string) => {
  switch (type) {
    case "FRIEND_INVITE":
      return (
        <Avatar
          sx={{ width: 30, height: 30 }}
          className={`${notificationConfigs[type].iconClassName}`}
        >
          <FaceRoundedIcon sx={{ width: 20, height: 20 }} />
        </Avatar>
      );
    case "CHALLENGE_INVITE":
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

const getMessage = ({
  type,
  sender,
  content,
}: {
  type: string;
  sender: string;
  content: { name: string; url: string } | any;
}) =>
  notificationConfigs[
    type as keyof { CHALLENGE_INVITE: string; FRIEND_INVITE: string }
  ].message
    .replace("$sender$", sender)
    .replace("$content$", type === "CHALLENGE_INVITE" ? content.name : content);

export const NotificationItem = ({
  type,
  sender,
  content,
  avatar,
  date,
}: {
  type: string;
  sender: string;
  content: { name: string; url: string } | any;
  avatar: string;
  date: string;
}) => {
  return (
    <Paper elevation={0}>
      <Grid
        container
        paddingY={2}
        sx={{ borderBottom: "1px solid", borderColor: grey[200] }}
      >
        <Grid
          item
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"-1.5em"}
        >
          <Avatar sx={{ width: 56, height: 56 }} src={avatar}></Avatar>
        </Grid>
        <Grid item xs={7}>
          <Grid item xs={12}>
            <Typography variant="caption">
              {moment(date).format("dddd DD MMMM YYYY hh:mm")}
            </Typography>
          </Grid>
          <Grid item xs={12} marginBottom={"0.3em"}>
            {parse(getMessage({ type, sender, content }))}
          </Grid>
          <Grid
            item
            xs={12}
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={6}>
              <Button>Accept</Button>
            </Grid>
            <Grid item xs={6} display={"flex"} justifyContent={"center"}>
              <Button>Decline</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"-1.5em"}
        >
          {getIcon(type)}
        </Grid>
      </Grid>
    </Paper>
  );
};
