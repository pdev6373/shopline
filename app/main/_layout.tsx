import { Stack } from "expo-router";
import { useTheme } from "../../hooks";
import Constants from "expo-constants";

export default function MainLayout() {
  const { COLOR } = useTheme();

  return (
    <Stack
      initialRouteName="mainScreens"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLOR.background.main,
          paddingTop: Constants.statusBarHeight,
        },
      }}
    />
  );
}
