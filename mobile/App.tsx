import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChallengesList from "./components/ChallengesList";
import Notifications from "./screens/Notifications";
import UploadPicture from "./components/UploadPicture";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Dashboard') {
                iconName = focused
                  ? 'leaf'
                  : 'leaf-outline';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Challenge photo') {
                iconName = focused ? 'camera' : 'camera-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
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
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}