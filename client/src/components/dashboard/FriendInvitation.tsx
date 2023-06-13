import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FriendChallengeRequest } from "../friend/FriendChallengeRequest";
import { FriendItem } from "../friend/FriendItem";

const colors = ["#FF9996", "#FFE5CD", "#62B6B7"];
const names = ["Thibault", "Nonaka", "Luke"];
const avatars = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd5PFcDiHxvTjILerFYZEIvN3CebMINKMhg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj4aXYYSDLGAQEZGKAteDT9Ia_wONVPsuUA&usqp=CAU",
];
export const FriendInvitation = () => {
  return (
    <Paper elevation={5} className="challengeItemContainer">
      <Stack padding={2} spacing={0.5}>
        {Array.from(Array(10).keys()).map((_, index) => (
          <FriendItem
            key={index}
            {...{
              name: names[index % names.length],
              avatar: avatars[index % avatars.length],
              challengedNTimes: index,
              url: "...",
              borderColor: colors[index % colors.length],
            }}
          />
        ))}
        <FriendChallengeRequest />
      </Stack>
    </Paper>
  );
};
