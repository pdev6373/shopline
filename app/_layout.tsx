import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "../hooks";
import * as NavigationBar from "expo-navigation-bar";
import { ToastRef } from "../types";
import { Toast } from "../components/general";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { COLOR } = useTheme();
  const toastRef = useRef<ToastRef>(null);

  useEffect(() => {
    (async () => {
      await NavigationBar.setBackgroundColorAsync(COLOR.background.main);
      await NavigationBar.setBorderColorAsync(COLOR.background.main);
    })();
  }, []);

  const showInfo = () => {
    toastRef.current?.hide(() => {
      toastRef.current?.show({
        duration: 400,
        text: "Hello",
        type: "info",
      });
    });
  };

  const showSuccess = () => {
    toastRef.current?.hide(() => {
      toastRef.current?.show({
        duration: 400,
        text: "Done",
        type: "success",
      });
    });
  };

  const showError = () => {
    toastRef.current?.hide(() => {
      toastRef.current?.show({
        duration: 400,
        text: "Failed",
        type: "error",
      });
    });
  };

  const hide = () => toastRef.current?.hide();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <>
        <Toast ref={toastRef} />
        <Stack screenOptions={{ headerShown: false }} />
      </>
    </ThemeProvider>
  );
}
