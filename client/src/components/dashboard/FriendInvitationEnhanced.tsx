import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FriendChallengeRequest } from "../friend/FriendChallengeRequest";
import { FriendItem } from "../friend/FriendItem";
import Grid from "@mui/material/Grid";
import { FriendItemEnhanced } from "../friend/FriendItemEnhanced";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { Search } from "@mui/icons-material";
import { User } from "../../gql/generated/schema";
import { useState } from "react";

const colors = ["#FF9996", "#FFE5CD", "#62B6B7"];
const names = ["Thibault", "Nonaka", "Luke"];
const avatars = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj4aXYYSDLGAQEZGKAteDT9Ia_wONVPsuUA&usqp=CAU",
];

const friends = Array.from(Array(3).keys()).map((_, index) => ({
  name: names[index % names.length],
  avatar: avatars[index % avatars.length],
  challengedNTimes: index,
  url: "...",
  borderColor: colors[index % colors.length],
}));

export const FriendInvitationEnhanced = () => {
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
          .filter(({ name }) => name.includes(searchedText))
          .map((friend) => (
            <FriendItemEnhanced {...friend} />
          ))}
      </Stack>
    </Grid>
  );
};
