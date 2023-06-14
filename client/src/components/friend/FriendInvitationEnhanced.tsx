import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { FriendItemEnhanced } from "./FriendItemEnhanced";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { Search } from "@mui/icons-material";
import { FriendRelationship } from "../../gql/generated/schema";
import { useState } from "react";
import { ThunksStatus } from "../../store";

type FriendInvitationMode = "CHALLENGE_INVITATION" | "FRIEND_INVITATION";

const colors = ["#FF9996", "#FFE5CD", "#62B6B7"];
const avatars = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj4aXYYSDLGAQEZGKAteDT9Ia_wONVPsuUA&usqp=CAU",
];

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
  status: "pending" | "declined" | "accepted" | "none",
  challengedNTimes?: number
) => {
  if (mode === "FRIEND_INVITATION") {
    if (status === "accepted" || status === "none") return "";
    return statusFriendRelationshipTexts[mode][status];
  }

  if (mode === "CHALLENGE_INVITATION") {
    return statusFriendRelationshipTexts[mode].replace(
      "$nbChallenge$",
      challengedNTimes?.toString() ?? "0"
    );
  }
  return "";
};

export const FriendInvitationEnhanced = ({
  friends,
  updateFriendInvitation,
  mode,
  statusUpdateFriendRelationship,
}: {
  statusUpdateFriendRelationship?: ThunksStatus;
  friends: Array<FriendRelationship & { isInvited: boolean }>;
  updateFriendInvitation: (id: string, invite: boolean) => void;
  mode: FriendInvitationMode;
}) => {
  const [searchedText, setSearchedText] = useState("");
  return (
    <Grid item container>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel>Look for a friend</InputLabel>
        <OutlinedInput
          fullWidth
          label="Look for a friend"
          placeholder="Enter your friend name"
          type="text"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton edge="start">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Stack spacing={2.5} width={"100%"} marginTop={4}>
        {friends
          .filter(({ friend: { firstName } }) =>
            firstName
              .toLowerCase()
              .replaceAll(" ", "")
              .trim()
              .includes(searchedText.toLowerCase().replaceAll(" ", "").trim())
          )
          .map(
            (
              {
                isInvited,
                friend: { firstName, id },
                status: friendRelationshipStatus,
              },
              index
            ) => {
              const { isLoading } = statusUpdateFriendRelationship?.find(
                ({ id: friendId }) => id === friendId
              ) ?? { isLoading: false };
              return (
                <FriendItemEnhanced
                  isLoading={isLoading}
                  key={id}
                  updateFriendInvitation={updateFriendInvitation}
                  name={firstName}
                  borderColor={colors[index % colors.length]}
                  id={id}
                  isInvited={isInvited}
                  subText={formatFriendshipStatus(
                    mode,
                    friendRelationshipStatus as
                      | "pending"
                      | "declined"
                      | "accepted"
                      | "none"
                  )}
                  avatar={avatars[index % avatars.length]}
                  activeText={actionsText[mode].activeText}
                  inactiveText={actionsText[mode].inactiveText}
                />
              );
            }
          )}
      </Stack>
    </Grid>
  );
};
