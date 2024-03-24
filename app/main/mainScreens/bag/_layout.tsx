import { Stack } from "expo-router";
import { useTheme } from "../../../../hooks";

export default function BagLayout() {
  const { COLOR } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLOR.background.main,
        },
      }}
    />
  );
}
