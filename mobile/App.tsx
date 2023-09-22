import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./screens/SignIn";
import { useGetProfileQuery, useSignOutMutation } from "./gql/generated/schema";
import { ProfileContext } from "./context/profileContext";
import { View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import NotificationsList from "./components/NotificationsList";
import SafeAreaView from "./components/SafeAreaView";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const { data: currentUser, refetch } = useGetProfileQuery({});
  const [logout] = useSignOutMutation();
  const [isTokenSet, setToken] = useState(false);

  // Init, load token from SecureStore
  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      setToken(token != null);
    };
    getToken();
  }, []);

  // Fetch profile when token is set.
  useEffect(() => {
    const refetchProfile = async () => {
      await refetch();
    };
    if (isTokenSet) {
      refetchProfile();
    }
  }, [isTokenSet]);

  // Handle logout
  const handleClick = async () => {
    await SecureStore.deleteItemAsync("token");
    await logout();
    setToken(false);
  };

  return (
    <ProfileContext.Provider value={{ isTokenSet, setToken }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(248, 255, 252, 0.95)",
        }}
      >
        <SafeAreaView>
          {isTokenSet && currentUser != null && (
            <NotificationsList
              allowedNotifications={
                currentUser?.profile.expoNotificationToken != null
              }
            />
          )}
          {!isTokenSet && <SignIn />}
          <Button onPress={() => setToken(!isTokenSet)}>Logout</Button>
        </SafeAreaView>
      </View>
    </ProfileContext.Provider>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </ApolloProvider>
);
