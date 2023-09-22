import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import { useSignInMutation } from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";
import { ProfileContext } from "../context/profileContext";
import { Button, TextInput, Text as PaperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";

const minPasswordLength = 8;
export default function SignIn() {
  const { setToken } = useContext(ProfileContext);

  const [login, { loading, error: signInError }] = useSignInMutation();

  const uri = Image.resolveAssetSource(require("./../assets/logo.svg")).uri;

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
        }}
      >
        <SvgUri style={{}} height={100} width={100} uri={uri} />
      </View>

      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          rowGap: 30,
        }}
      >
        <View style={{ rowGap: 5 }}>
          <Text style={{ color: "black", fontSize: 34, fontWeight: "600" }}>
            Nice to see you back!
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Have a wonderful day.
          </Text>
        </View>

        <View style={{ width: "100%", rowGap: 5 }}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            render={({ field: { onChange } }) => (
              <TextInput
                style={styles.textInput}
                label="Email"
                outlineStyle={{ borderRadius: 25 }}
                autoCapitalize="none"
                placeholder="Enter your email"
                mode="outlined"
                placeholderTextColor="#A8A9A8"
                activeOutlineColor="#3bd8a9"
                error={formErrors.email != null}
                outlineColor="#A8A9A8"
                autoComplete="email"
                onChangeText={(newValue) => {
                  onChange(newValue);
                }}
              />
            )}
            name="email"
          />

          {formErrors.email && (
            <PaperText
              style={{ color: "#ba000d", paddingLeft: 12 }}
              variant="labelSmall"
            >
              Provide a correct email address.
            </PaperText>
          )}
        </View>

        <View style={{ width: "100%", rowGap: 5 }}>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: minPasswordLength,
            }}
            name="password"
            render={({ field: { onChange } }) => (
              <TextInput
                label="Password"
                placeholder="Enter your password"
                placeholderTextColor="#A8A9A8"
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="password"
                outlineStyle={{ borderRadius: 25 }}
                outlineColor="#A8A9A8"
                activeOutlineColor="#3bd8a9"
                style={styles.textInput}
                mode="outlined"
                error={formErrors.password != null}
                onChangeText={(newValue) => {
                  onChange(newValue);
                }}
              />
            )}
          />

          {formErrors.password && (
            <PaperText
              style={{ color: "#ba000d", paddingLeft: 12 }}
              variant="labelSmall"
            >
              Provide a password with at least 8 characters.
            </PaperText>
          )}
          {signInError && (
            <PaperText
              style={{ color: "#ba000d", paddingLeft: 12 }}
              variant="labelSmall"
            >
              {signInError.message}
            </PaperText>
          )}
        </View>

        <Button
          buttonColor="black"
          uppercase
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 50,
          }}
          mode="contained"
          onPress={handleSubmit(async (data) => {
            try {
              const res = await login({
                variables: {
                  data: { email: data.email, password: data.password },
                },
              });
              await SecureStore.setItemAsync(
                "token",
                res.data?.login.token as string
              );
              if (setToken != null) setToken(true);
            } catch (err) {
              console.log(err);
            }
          })}
          loading={loading}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },
  error: {
    color: "red",
  },
  textInput: {
    borderRadius: 200,
    width: "100%",
    backgroundColor: "white",
    height: 50,
  },
});
