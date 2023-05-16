import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  useGetProfileQuery,
  useSignInMutation,
  useSignOutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function SignIn() {
  const [credentials, setCredentials] = useState({
    email: "user@app.com",
    password: "test@123",
  });
    const [error, setError] = useState("");
    
    const [login] = useSignInMutation();
    const [logout] = useSignOutMutation();
    const { data: currentUser, client } = useGetProfileQuery({
      errorPolicy: "ignore",
    });

  return (
    <View style={styles.container}>
      {currentUser?.profile ? (
        <View>
          <Text>connected as {currentUser.profile.email}</Text>
          <Button
            onPress={async () => {
              console.log({ credentials });
              try {
                await logout();
                SecureStore.deleteItemAsync("token");
              } catch (err) {
                setError("invalid credentials");
              } finally {
                client.resetStore();
              }
            }}
            title="Log out"
          />
        </View>
      ) : (
        <View>
          <TextInput
            value={credentials.email}
            onChangeText={(newValue) =>
              setCredentials({ ...credentials, email: newValue })
            }
          />
          <TextInput
            value={credentials.password}
            onChangeText={(newValue) =>
              setCredentials({ ...credentials, password: newValue })
            }
          />

          <Button
            onPress={async () => {
              try {
                setError("");
                const res = await login({ variables: { data: credentials } });
                SecureStore.setItemAsync("token", res.data?.__typename as string);
              } catch (err) {
                setError("invalid credentials");
              } finally {
                client.resetStore();
              }
            }}
            title="Log in"
          />

          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});