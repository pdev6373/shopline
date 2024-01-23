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
  href?: string | any;
  background: string;
  padding: number;
  radius: number;
  borderColor?: string;
  disabled?: boolean;
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
  disabled = false,
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
    <Link href={href} asChild>
      <Pressable style={Styles.button}>{buttonText}</Pressable>
    </Link>
  ) : (
    <Pressable disabled={disabled} onPress={onPress} style={Styles.button}>
      {iconLeft}
      {buttonText}
      {iconRight}
    </Pressable>
  );
}

type MainButtonType = {
  children: string;
  href?: string;
  onPress?: any;
  disabled?: boolean;
  transparent?: boolean;
};
export const MainButton = ({
  children,
  href,
  onPress,
  disabled = false,
  transparent = false,
}: MainButtonType) => {
  const { COLOR } = useTheme();

  return (
    <Button
      textColor={transparent ? COLOR.button.main : COLOR.button.textMain}
      textLetterSpacing={0.1}
      textWeight="700"
      textSize={14}
      background={transparent ? "transparent" : COLOR.button.main}
      padding={16}
      radius={1000}
      href={href}
      onPress={onPress}
      disabled={disabled}
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
