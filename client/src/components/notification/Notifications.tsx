import Grid from "@mui/material/Grid";
import { NotificationItem } from "./NotificationItem";
import { HeaderScreen } from "../menu/HeaderScreen";
import Stack from "@mui/material/Stack";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/styles";

const notifications = [
  {
    type: "CHALLENGE_INVITE",
    sender: "Luke",
    content: { name: "Paris cleaning challenge", url: "myurl" },
    date: "2014-06-01 12:00",
    avatar:
      "https://images.prismic.io/utopix-next-website/Mzk0NGJkOWEtY2ZlYS00MjVjLTkwNTAtOGY5OWQzN2IzNGVi_762cec57-2eaf-4eaf-9a0d-2e7860147e48_profilhomme7.jpg?ixlib=js-3.7.1&w=3840&auto=format&fit=max",
  },
  {
    type: "CHALLENGE_INVITE",
    sender: "Emma",
    content: { name: "Eat seasonal products", url: "myurl" },
    date: "2014-06-01 12:00",
    avatar:
      "https://www.informelles.media/wp-content/uploads/2022/05/Alice-Lhabouz-Couleur-HD-scaled.jpg",
  },
  {
    type: "FRIEND_INVITE",
    sender: "Bryan",
    content: { url: "myurl" },
    date: "2014-06-01 12:00",
    avatar: "https://ca.slack-edge.com/TGU64F2H2-U04DJ3K2QTG-fbaa52a9366f-512",
  },
];

export const Notifications = () => {
  return (
    <Grid container gap={4}>
      <Stack>
        <HeaderScreen
          title=""
          subtitle="Latest notifications"
          afterSubtitleComponent={
            <Badge
              color="error"
              badgeContent={notifications.length}
              showZero={false}
            />
          }
        />
        <Stack marginTop={2}>
          {notifications.map((notification) => (
            <NotificationItem {...notification} />
          ))}
        </Stack>
      </Stack>
      <Stack>
        <HeaderScreen
          title=""
          subtitle="Archived"
          afterSubtitleComponent={
            <Badge
              color="error"
              badgeContent={notifications.length}
              showZero={false}
            />
          }
        />
        <Stack marginTop={2}>
          {notifications.map((notification) => (
            <NotificationItem {...notification} />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};
