import Grid from "@mui/material/Grid";
import { NotificationItem } from "./NotificationItem";
import { HeaderScreen } from "../menu/HeaderScreen";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
<<<<<<< Updated upstream
import {
  NotificationStatus,
  useGetOwnNotificationsQuery,
} from "../../gql/generated/schema";
import { Typography } from "@mui/material";

export const Notifications = () => {
  const { data, loading } = useGetOwnNotificationsQuery();
=======
import { useGetOwnNotificationsQuery } from "../../gql/generated/schema";
import { useEffect } from "react";

export const Notifications = () => {
  const { data } = useGetOwnNotificationsQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);
>>>>>>> Stashed changes

  return (
    <Grid container gap={4} direction={"column"}>
      <Stack width="100%">
        <HeaderScreen
          title=""
          subtitle="Latest notifications"
          afterSubtitleComponent={
            <Badge
              color="error"
<<<<<<< Updated upstream
              badgeContent={
                <Typography fontSize={"1em"} fontWeight={700}>
                  {
                    data?.getOwnNotifications.filter(
                      ({ status }) => status === NotificationStatus.Pending
                    ).length
                  }
                </Typography>
              }
              showZero={true}
            />
          }
        />

        <Stack marginTop={2} gap={1}>
          {data?.getOwnNotifications
            .filter(({ status }) => status === NotificationStatus.Pending)
            .map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
        </Stack>
      </Stack>
      <Stack width={"100%"}>
=======
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
>>>>>>> Stashed changes
        <HeaderScreen
          title=""
          subtitle="Archived"
          afterSubtitleComponent={
            <Badge
              sx={{ fontWeight: "700 !important" }}
              color="error"
<<<<<<< Updated upstream
              badgeContent={
                <Typography fontSize={"1em"} fontWeight={700}>
                  {
                    data?.getOwnNotifications.filter(
                      ({ status }) => status !== NotificationStatus.Pending
                    ).length
                  }
                </Typography>
              }
              showZero={true}
=======
              badgeContent={data?.getOwnNotifications.length}
              showZero={false}
>>>>>>> Stashed changes
            />
          }
        />
        <Stack marginTop={2} gap={1}>
<<<<<<< Updated upstream
          {data?.getOwnNotifications
            .filter(({ status }) => status !== NotificationStatus.Pending)
            .map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
=======
          {data?.getOwnNotifications.map((notification) => (
            <NotificationItem {...notification} />
          ))}
>>>>>>> Stashed changes
        </Stack>
      </Stack> */}
    </Grid>
  );
};
