import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengesList from "./components/ChallengesList";
import Notifications from "./screens/Notifications";
import UploadPicture from "./components/UploadPicture";
import Ionicons from "@expo/vector-icons/Ionicons";
import SignIn from "./screens/SignIn";
import { useGetProfileQuery } from "./gql/generated/schema";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <NavigationContainer>
      {currentUser?.profile ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') {
                iconName = focused ? 'leaf' : 'leaf-outline';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Challenge photo') {
                iconName = focused ? 'camera' : 'camera-outline';
              } else if (route.name === 'Logout') {
                iconName = focused ? 'exit' : 'exit-outline';
              }
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Dashboard"
            component={ChallengesList}
            options={{unmountOnBlur: true}}
          />
          <Tab.Screen name="Notifications" component={Notifications} />
          <Tab.Screen name="Challenge photo" component={UploadPicture} />
          <Tab.Screen name="Logout" component={SignIn} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () =>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>