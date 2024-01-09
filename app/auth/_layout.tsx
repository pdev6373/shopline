import { Stack, usePathname } from "expo-router";
import Constants from "expo-constants";
import { useTheme } from "../../hooks";

export default function AuthLayout() {
  const pathname = usePathname();
  const { COLOR } = useTheme();

  return (
    <Stack
      initialRouteName="/auth/Login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: pathname === "/auth/EnableFingerprint" ? 0 : 24,
          backgroundColor: COLOR.background.main,
          paddingTop: Constants.statusBarHeight,
        },
      }}
    />
  );
}
