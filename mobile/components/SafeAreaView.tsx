import { Platform, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// High order component
export default (props: any) => (
  <SafeAreaView
    {...props}
    style={{
      flex: 1,
      paddingHorizontal: 30,
    }}
  >
    {props.children}
  </SafeAreaView>
);
