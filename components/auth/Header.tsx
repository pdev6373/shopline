import { StyleSheet, Pressable } from "react-native";
import { BackArrow, Cancel, LogoDark } from "../../assets/images/svgs";
import { useRouter } from "expo-router";

type HeaderType = {
  type?: "arrow" | "cancel" | "logo";
  route?: any;
};

export default function Header({ type = "cancel", route }: HeaderType) {
  const router = useRouter();

  const iconPressHandler = () => (route ? router.push(route) : router.back());

  return type === "cancel" ? (
    <Pressable onPress={iconPressHandler}>
      <Cancel width={24} height={24} />
    </Pressable>
  ) : type === "arrow" ? (
    <Pressable onPress={iconPressHandler}>
      <BackArrow width={24} height={24} />
    </Pressable>
  ) : (
    <LogoDark width={44} height={44} />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
