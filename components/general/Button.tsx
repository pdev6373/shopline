import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import {
  TextLetterSpacingType,
  TextSizeType,
  TextWeightType,
} from "../../types";
import { Link } from "expo-router";
import { useTheme } from "../../hooks";

type ButtonType = {
  children: string;
  textColor: string;
  textSize: TextSizeType;
  textWeight: TextWeightType;
  textLetterSpacing: TextLetterSpacingType;
  onPress?: any;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  href?: string;
  background: string;
  padding: number;
  radius: number;
};

type ButtonStylesType = {
  backgroundColor: string;
  padding: number;
  borderRadius: number;
};

export default function Button({
  children,
  textColor,
  textSize,
  textWeight,
  textLetterSpacing,
  onPress,
  background,
  radius,
  padding,
  iconLeft,
  iconRight,
  href,
}: ButtonType) {
  const Styles = styles({
    backgroundColor: background,
    borderRadius: radius,
    padding,
  });

  const buttonText = (
    <Text
      color={textColor}
      size={textSize}
      weight={textWeight}
      letterSpacing={textLetterSpacing}
      type="body"
    >
      {children}
    </Text>
  );

  return href ? (
    <Link href={href} style={Styles.button}>
      {buttonText}
    </Link>
  ) : (
    <Pressable onPress={onPress} style={Styles.button}>
      {buttonText}
    </Pressable>
  );
}

type MainButtonType = { children: string; href?: string; onPress?: any };
export const MainButton = ({ children, href, onPress }: MainButtonType) => {
  const { COLOR } = useTheme();

  return (
    <Button
      textColor={COLOR.button.textMain}
      textLetterSpacing={0.1}
      textWeight="700"
      textSize={14}
      background={COLOR.button.main}
      padding={16}
      radius={1000}
      href={href}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

const styles = ({ backgroundColor, padding, borderRadius }: ButtonStylesType) =>
  StyleSheet.create({
    button: {
      backgroundColor,
      padding,
      borderRadius,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
