import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import ChallengesList from "./components/ChallengesList";
import UploadPicture from "./components/UploadPicture";

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <ChallengesList />
          <UploadPicture />
          <Text>Hello</Text>
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
