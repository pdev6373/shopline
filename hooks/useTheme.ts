import { useColorScheme } from "react-native";
import { Colors } from "../constants";

const useTheme = () => {
  const colorScheme = useColorScheme();
  const COLOR = Colors[colorScheme || "light"];

  return { COLOR };
};

export default useTheme;
