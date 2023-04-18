import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { FriendItemProps } from "../../interfaces/friend/friend.interface";

export const FriendItem = ({
  name,
  avatar,
  challengedNTimes,
  url,
  borderColor,
}: FriendItemProps) => {
  const [sentInvitation, setSentInvitation] = useState(false);
  return (
    <Grid container paddingY={1}>
      <Grid xs={10} container>
        <Grid xs={3} paddingRight={1}>
          <Avatar
            style={{
              border: `3px solid ${borderColor}`,
              width: "50px",
              height: "50px",
            }}
            src={avatar}
          ></Avatar>
        </Grid>
        <Grid
          xs={9}
          justifyContent="center"
          flexDirection="column"
          display="flex"
        >
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
            Challenged {challengedNTimes} times
          </Typography>
        </Grid>
      </Grid>
      <Grid
        xs={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LoadingButton
          onClick={() => setSentInvitation(true)}
          loading={sentInvitation}
          style={{
            textTransform: "capitalize",
            borderRadius: "20px",
            background: "#78BAA2",
          }}
          variant="contained"
        >
          Invite
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
