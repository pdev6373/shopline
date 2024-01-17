import { Stack } from "expo-router";
import { useTheme } from "../../hooks";
import Constants from "expo-constants";

export default function AuthLayout() {
  const { COLOR } = useTheme();

  return (
    <Stack
      initialRouteName="/auth/(Auth)?type=login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: 24,
          backgroundColor: COLOR.background.main,
          paddingTop: Constants.statusBarHeight,
        },
      }}
    />
  );
}
