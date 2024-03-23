import { Dimensions, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import {
  TextLetterSpacingType,
  TextSizeType,
  TextWeightType,
} from "../../types";
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
  background: string;
  padding: number;
  paddingHorizontal?: number;
  radius: number;
  borderColor?: string;
  disabled?: boolean;
};

type ButtonStylesType = {
  backgroundColor: string;
  padding: number;
  paddingHorizontal: number;
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
  paddingHorizontal,
  iconLeft,
  iconRight,
  borderColor,
  disabled = false,
}: ButtonType) {
  const Styles = styles({
    backgroundColor: background,
    borderRadius: radius,
    padding: padding - 1,
    paddingHorizontal: (paddingHorizontal ? paddingHorizontal : padding) - 1,
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

  return (
    <Pressable disabled={disabled} onPress={onPress} style={Styles.button}>
      {iconLeft}
      {buttonText}
      {iconRight}
    </Pressable>
  );
}

type MainButtonType = {
  children: string;
  onPress?: any;
  disabled?: boolean;
  transparent?: boolean;
};
export const MainButton = ({
  children,
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
  paddingHorizontal,
  borderRadius,
  borderColor,
}: ButtonStylesType) =>
  StyleSheet.create({
    button: {
      backgroundColor,
      padding,
      paddingHorizontal: paddingHorizontal,
      borderRadius,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
      borderColor: borderColor || backgroundColor,
      borderWidth: 1,
      flexShrink: 0,
      flexGrow: 1,
      minWidth: Dimensions.get("screen").width * 0.5 - 30,
    },
  });
