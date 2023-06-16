import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { FriendItemEnhanced } from "../friend/FriendItemEnhanced";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { Search } from "@mui/icons-material";
import { FriendRelationship } from "../../gql/generated/schema";
import { useState } from "react";

const colors = ["#FF9996", "#FFE5CD", "#62B6B7"];
const avatars = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj4aXYYSDLGAQEZGKAteDT9Ia_wONVPsuUA&usqp=CAU",
];

export const FriendInvitationEnhanced = ({
  friends,
  updateFriendInvitation,
}: {
  friends: Array<FriendRelationship & { invite: boolean }>;
  updateFriendInvitation: (id: string, invite: boolean) => void;
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
            firstName.includes(searchedText)
          )
          .map(({ invite, friend: { firstName, id } }, index) => (
            <FriendItemEnhanced
              key={id}
              updateFriendInvitation={updateFriendInvitation}
              name={firstName}
              borderColor={colors[index % colors.length]}
              id={id}
              isInvited={invite}
              avatar={avatars[index % avatars.length]}
            />
          ))}
      </Stack>
    </Grid>
  );
};
