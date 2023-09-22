import { FlatList, View, Image, Platform, ScrollView } from "react-native";
import {
  useGetOwnNotificationsQuery,
  Notification,
  NotificationStatus,
  useUpdateNotificationMutation,
  useUpdateExpoPushNotificationTokenMutation,
} from "../gql/generated/schema";
import { Avatar, Badge, Button, Text } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const parseContent = (content: string) => {
  const splitted = content.replaceAll("</b>", "<b>").split("<b>");

  return (
    <Text variant="bodyMedium">
      {splitted[0]}
      <Text style={{ fontWeight: "800" }}>{splitted[1]}</Text>
      {splitted[2]}
      <Text style={{ fontWeight: "800" }}>{splitted[3] ?? ""}</Text>
    </Text>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    console.log(existingStatus);
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function NotificationsList({ allowedNotifications = false }) {
  const responseListener = useRef<Notifications.Subscription>();

  const { data, loading, error, refetch } = useGetOwnNotificationsQuery();
  const [notifications, setNotifications] = useState<Array<Notification>>();
  useEffect(() => {
    if (!allowedNotifications)
      registerForPushNotificationsAsync().then((token) => {
        if (token != null)
          useUpdateExpoPushNotificationTokenMutation({ variables: { token } });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        refetch();
      });

    return () => {
      if (responseListener.current != null)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  });
  useEffect(() => {
    if (data?.getOwnNotifications != null)
      setNotifications([...data.getOwnNotifications]);
  }, [data]);
  return (
    <ScrollView
      nestedScrollEnabled
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <View>
        <Text
          variant="displaySmall"
          style={{ fontWeight: "700", color: "#3bd8a9" }}
        >
          Notifications
        </Text>
      </View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            marginBottom: 10,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              fontWeight: "700",
              color: "#104455",
            }}
          >
            Latest notifications
          </Text>
          <Badge
            size={25}
            style={{
              marginLeft: 5,
              fontWeight: "700",
              color: "white",
              alignSelf: "center",
            }}
          >
            {
              notifications?.filter(
                ({ status }) => status === NotificationStatus.Pending
              ).length
            }
          </Badge>
        </View>
        <FlatList
          nestedScrollEnabled
          style={{ maxHeight: 400 }}
          data={notifications?.filter(
            ({ status }) => status === NotificationStatus.Pending
          )}
          renderItem={({ item: notification }) => (
            <NotificationItem
              notification={notification}
              onNotificationAnsweredCallback={() => refetch()}
            />
          )}
          keyExtractor={(notification) => notification.id}
        />
      </View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-start",
            marginVertical: 10,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              fontWeight: "700",
              color: "#104455",
            }}
          >
            Archived
          </Text>
          <Badge
            size={25}
            style={{
              marginLeft: 5,
              fontWeight: "700",
              color: "white",
              alignSelf: "center",
            }}
          >
            {
              notifications?.filter(
                ({ status }) => status !== NotificationStatus.Pending
              ).length
            }
          </Badge>
        </View>

        <FlatList
          nestedScrollEnabled
          scrollEnabled
          style={{ maxHeight: 400 }}
          data={notifications?.filter(
            ({ status }) => status !== NotificationStatus.Pending
          )}
          renderItem={({ item: notification }) => (
            <NotificationItem notification={notification} />
          )}
          keyExtractor={(notification) => notification.id}
        />
      </View>
    </ScrollView>
  );
}

export const NotificationItem = ({
  notification,
  onNotificationAnsweredCallback,
}: {
  notification: Notification;
  onNotificationAnsweredCallback?: any;
}) => {
  const [updateNotification, { loading }] = useUpdateNotificationMutation();
  const [notificationTypeUpdated, setNotificationTypeUpdated] =
    useState<NotificationStatus | null>(null);
  const onNotificationAnswerButtonClicked = async (
    status: NotificationStatus
  ) => {
    try {
      setNotificationTypeUpdated(status);
      await updateNotification({
        variables: {
          notificationId: notification.id,
          status,
        },
      });
      onNotificationAnsweredCallback();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        padding: 15,
        borderColor: "#E7E7E7",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          minHeight: 100,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={60}
          source={{
            uri: notification.picture,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 5,
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text variant="labelMedium" style={{ color: "#757575" }}>
            {moment(notification.date).format("dddd DD MMMM YYYY hh:mm")}
          </Text>
          {parseContent(notification.content)}
          {notification.status === NotificationStatus.Pending && (
            <View
              style={{
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                columnGap: 5,
              }}
            >
              <Button
                labelStyle={{
                  padding: 0,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}
                buttonColor="black"
                loading={
                  loading &&
                  notificationTypeUpdated === NotificationStatus.Accepted
                }
                style={{}}
                mode="contained"
                onPress={() =>
                  onNotificationAnswerButtonClicked(NotificationStatus.Accepted)
                }
              >
                <Text
                  variant="labelMedium"
                  style={{ fontWeight: "700", color: "white" }}
                >
                  Accept
                </Text>
              </Button>
              <Button
                labelStyle={{ marginHorizontal: 5, marginVertical: 5 }}
                buttonColor="black"
                loading={
                  loading &&
                  notificationTypeUpdated === NotificationStatus.Declined
                }
                mode="contained"
                onPress={() =>
                  onNotificationAnswerButtonClicked(NotificationStatus.Declined)
                }
              >
                <Text
                  variant="labelMedium"
                  style={{ fontWeight: "700", color: "white" }}
                >
                  Decline
                </Text>
              </Button>
            </View>
          )}
        </View>
        <View>
          <Avatar.Icon
            size={35}
            style={{
              marginLeft: 10,
              backgroundColor:
                notification.type === "friend_invitation"
                  ? "#f7ce4b"
                  : "rgba(250, 123, 135, 0.8)",
            }}
            color="white"
            icon={
              notification.type === "friend_invitation" ? "face-man" : "gamepad"
            }
          />
        </View>
      </View>
    </View>
  );
};
