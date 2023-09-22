import "dotenv/config";

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#ffffff",
        },
      ],
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      REACT_APP_GRAPHQL_API_URL: process.env.REACT_APP_GRAPHQL_API_URL,
    },
  },
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/notification-icon.png",
        color: "#ffffff",

        // sounds: [
        //   "./local/assets/notification-sound.wav",
        //   "./local/assets/notification-sound-other.wav",
        // ],
      },
    ],
  ],
};
