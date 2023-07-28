import { Avatar, Button, Typography, Badge } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  FriendInvitationMode,
  FriendItemEnhancedProps,
} from "../../interfaces/friend/friend.interface";
import {
  Check,
  CheckCircle,
  CircleNotifications,
  NotificationsNone,
  Sync,
} from "@mui/icons-material";

const statusFriendRelationshipTexts = {
  FRIEND_INVITATION: {
    pending: "Waiting for your friend to answer.",
    declined: "Your friend invitation was declined.",
  },
  CHALLENGE_INVITATION: "Challenged $nbChallenge$ times",
};

const actionsText = {
  FRIEND_INVITATION: {
    activeText: "Unfriend",
    inactiveText: "Invite",
  },
  CHALLENGE_INVITATION: {
    activeText: "Cancel",
    inactiveText: "Invite",
  },
};

const formatFriendshipStatus = (
  mode: FriendInvitationMode,
  challengedNTimes?: number
) => {
  if (mode === "FRIEND_INVITATION") {
    return "";
  }

  if (mode === "CHALLENGE_INVITATION") {
    return statusFriendRelationshipTexts[mode].replace(
      "$nbChallenge$",
      challengedNTimes?.toString() ?? "0"
    );
  }
  return "";
};

export const FriendItemEnhanced = ({
  avatar,
  isInvited,
  isLoading = false,
  borderColor,
  mode,
  status,
  friend: { firstName, id },
  didCurrentUserAskedFriendship,
  challengedNTimes,
  updateFriendInvitation,
}: FriendItemEnhancedProps & {
  updateFriendInvitation: (id: string, invite: boolean) => void;
}) => {
  const getButtonText = () => {
    if (isLoading) return "Loading";
    if (isInvited) return actionsText[mode]["activeText"];
    if (!isInvited) return actionsText[mode]["inactiveText"];
    return actionsText[mode]["activeText"];
  };

  const getFriendshipBadge = () => {
    let icon = null;
    if (mode === "FRIEND_INVITATION") {
      if (status === "accepted") {
        icon = <Check sx={{ fontSize: "16px" }} />;
      }

      if (status === "pending") {
        if (!didCurrentUserAskedFriendship)
          icon = <NotificationsNone sx={{ fontSize: "16px" }} />;
        if (didCurrentUserAskedFriendship)
          icon = <Sync sx={{ fontSize: "16px" }} />;
      } // bell // Check your notification
    }

    return icon != null ? (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "50%",
          width: "16px",
          height: "16px",
          fontSize: "16px",
          border: "2px solid white",
          boxShadow: "inset 0px 0px 0px 2px black",
        }}
      >
        {icon}
      </div>
    ) : null;
  };
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <div style={{ flexBasis: "70px" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={getFriendshipBadge()}
        >
          <Avatar
            style={{
              border: `4px solid ${borderColor}`,
              width: "50px",
              height: "50px",
            }}
            src={avatar}
          />
        </Badge>
      </div>
      <Grid item flex={1}>
        <Typography fontSize={18} fontWeight={400} className="">
          {firstName}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight={400}
          fontSize={14}
          lineHeight={0.7}
          className="darkGreyColor"
        >
          {formatFriendshipStatus(mode, challengedNTimes)}
        </Typography>
      </Grid>
      <Button
        onClick={() => {
          updateFriendInvitation(id, !isInvited);
        }}
        style={{
          boxShadow: "none",
          borderRadius: "25px",
          textTransform: "capitalize",
          fontWeight: 500,
          color: isInvited ? "black" : "white",
          background: isInvited ? "#DADADA" : "black",
        }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          {getButtonText()}
        </Typography>
      </Button>
    </Grid>
  );
};
