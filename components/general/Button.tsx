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
  borderColor?: string;
};

type ButtonStylesType = {
  backgroundColor: string;
  padding: number;
  borderRadius: number;
  borderColor?: string;
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
  borderColor,
}: ButtonType) {
  const Styles = styles({
    backgroundColor: background,
    borderRadius: radius,
    padding: padding - 1,
    borderColor,
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
      {iconLeft}
      {buttonText}
      {iconRight}
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

type SocialButtonType = { children: string; onPress: any; icon: JSX.Element };
export const SocialButton = ({ children, onPress, icon }: SocialButtonType) => {
  const { COLOR } = useTheme();

  return (
    <Button
      textColor={COLOR.text.main}
      textLetterSpacing={0.1}
      textWeight="700"
      textSize={14}
      background={COLOR.background.main}
      padding={16}
      radius={1000}
      borderColor={COLOR.border}
      onPress={onPress}
      iconLeft={icon}
    >
      {children}
    </Button>
  );
};

const styles = ({
  backgroundColor,
  padding,
  borderRadius,
  borderColor,
}: ButtonStylesType) =>
  StyleSheet.create({
    button: {
      backgroundColor,
      padding,
      borderRadius,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
      borderColor: borderColor || backgroundColor,
      borderWidth: 1,
      flex: 1,
    },
  });
