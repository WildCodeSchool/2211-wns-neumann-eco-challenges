import Grid from "@mui/material/Grid";
import { NotificationItem } from "./NotificationItem";
import { HeaderScreen } from "../menu/HeaderScreen";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { useGetOwnNotificationsQuery } from "../../gql/generated/schema";
import { useEffect } from "react";

export const Notifications = () => {
  const { data, loading } = useGetOwnNotificationsQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Grid container gap={4}>
      <Stack>
        <HeaderScreen
          title=""
          subtitle="Latest notifications"
          afterSubtitleComponent={
            <Badge
              color="error"
              badgeContent={data?.getOwnNotifications.length}
              showZero={false}
            />
          }
        />

        <Stack marginTop={2} gap={1}>
          {data?.getOwnNotifications.map((notification) => (
            <NotificationItem notification={notification} />
          ))}
        </Stack>
      </Stack>
      {/* <Stack>
        <HeaderScreen
          title=""
          subtitle="Archived"
          afterSubtitleComponent={
            <Badge
              color="error"
              badgeContent={data?.getOwnNotifications.length}
              showZero={false}
            />
          }
        />
        <Stack marginTop={2} gap={1}>
          {data?.getOwnNotifications.map((notification) => (
            <NotificationItem {...notification} />
          ))}
        </Stack>
      </Stack> */}
    </Grid>
  );
};
