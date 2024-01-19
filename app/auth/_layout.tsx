import { Stack } from "expo-router";
import { useTheme } from "../../hooks";
import Constants from "expo-constants";

export default function AuthLayout() {
  const { COLOR } = useTheme();

  return (
    <Stack
      initialRouteName="/auth"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: 24,
          backgroundColor: COLOR.background.main,
          paddingTop: Constants.statusBarHeight + 32,
          paddingBottom: 16,
        },
      }}
    />
  );
}
