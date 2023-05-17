import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FriendChallengeRequest } from "../friend/FriendChallengeRequest";
import { FriendItem } from "../friend/FriendItem";
import Grid from "@mui/material/Grid";
import { FriendItemEnhanced } from "../friend/FriendItemEnhanced";

const colors = ["#FF9996", "#FFE5CD", "#62B6B7"];
const names = ["Thibault", "Nonaka", "Luke"];
const avatars = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj4aXYYSDLGAQEZGKAteDT9Ia_wONVPsuUA&usqp=CAU",
];
export const FriendInvitationEnhanced = () => {
  return (
    <Grid container>
      <Stack spacing={2.5} width={"100%"}>
        {Array.from(Array(3).keys()).map((_, index) => (
          <FriendItemEnhanced
            {...{
              name: names[index % names.length],
              avatar: avatars[index % avatars.length],
              challengedNTimes: index,
              url: "...",
              borderColor: colors[index % colors.length],
            }}
          />
        ))}
      </Stack>
    </Grid>
  );
};
