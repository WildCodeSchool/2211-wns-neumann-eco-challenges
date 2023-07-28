import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FriendItemEnhancedProps } from "../../interfaces/friend/friend.interface";

export const FriendItemEnhanced = ({
  name,
  avatar,
  subText,
  id,
  isInvited,
  isLoading = false,
  borderColor,
  activeText,
  inactiveText,
  updateFriendInvitation,
}: FriendItemEnhancedProps & {
  updateFriendInvitation: (id: string, invite: boolean) => void;
}) => {
  const getButtonText = () => {
    if (isLoading) return "Loading";
    if (isInvited) return activeText;
    if (!isInvited) return inactiveText;
    return activeText;
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
        <Avatar
          style={{
            border: `4px solid ${borderColor}`,
            width: "50px",
            height: "50px",
          }}
          src={avatar}
        />
      </div>
      <Grid item flex={1}>
        <Typography fontSize={18} fontWeight={400} className="">
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight={400}
          fontSize={14}
          lineHeight={0.7}
          className="darkGreyColor"
        >
          {subText}
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
<<<<<<< Updated upstream
      >
        <Typography variant="subtitle2" fontWeight={700}>
          {getButtonText()}
        </Typography>
      </Button>
=======
      ></Button>
>>>>>>> Stashed changes
    </Grid>
  );
};
