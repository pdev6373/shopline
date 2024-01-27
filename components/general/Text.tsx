import { Text as ReactNativeText, StyleSheet } from "react-native";
import { TextLetterSpacingType, TextSizeType, TextType } from "../../types";
import { useTheme } from "../../hooks";
import Animated from "react-native-reanimated";

type LineHeightType =
  | 16
  | 20.4
  | 23.8
  | 25.2
  | 26.4
  | 27
  | 28
  | 28.8
  | 31.2
  | 35
  | 48
  | 57.6;
type FontFamilyType =
  | "PlusJakartaSans-Regular"
  | "PlusJakartaSans-Medium"
  | "PlusJakartaSans-SemiBold"
  | "PlusJakartaSans-Bold";

type TextStylesType = {
  color: string;
  fontSize: TextSizeType;
  fontFamily: FontFamilyType;
  letterSpacing?: TextLetterSpacingType;
  lineHeight: LineHeightType;
  center?: boolean;
};

export default function Text({
  children,
  color,
  size,
  weight,
  letterSpacing,
  type,
  center = false,
  onLayout,
  isAnimated = false,
  style,
}: TextType) {
  const fontFamily = (): FontFamilyType => {
    switch (weight) {
      case "400":
        return "PlusJakartaSans-Regular";
      case "500":
        return "PlusJakartaSans-Medium";
      case "600":
        return "PlusJakartaSans-SemiBold";
      case "700":
        return "PlusJakartaSans-Bold";
    }
  };

  const lineHeight = (): LineHeightType => {
    switch (size) {
      case 10:
        return 16;
      case 12:
        return 20.4;
      case 14:
        return 23.8;
      case 16:
        return 26.4;
      case 18:
        return type === "body" ? (weight === "400" ? 28.8 : 27) : 25.2;
      case 20:
        return 28;
      case 24:
        return 31.2;
      case 28:
        return 35;
      case 40:
        return 48;
      case 48:
        return 57.6;
    }
  };

  const Styles = styles({
    color,
    fontSize: size,
    fontFamily: fontFamily(),
    lineHeight: lineHeight(),
    letterSpacing,
    center,
  });

  return isAnimated ? (
    <Animated.Text
      onLayout={onLayout || undefined}
      style={[Styles.text, style]}
    >
      {children}
    </Animated.Text>
  ) : (
    <ReactNativeText
      onLayout={onLayout || undefined}
      style={[Styles.text, style]}
    >
      {children}
    </ReactNativeText>
  );
}

type MainHeadingType = { children: string; center?: boolean };
export const MainHeading = ({ children, center }: MainHeadingType) => {
  const { COLOR } = useTheme();
  return (
    <Text
      color={COLOR.text.main}
      size={28}
      weight="700"
      type="heading"
      center={center}
    >
      {children}
    </Text>
  );
};

type MainTextLight = { children: string; center?: boolean };
export const MainTextLight = ({ children, center }: MainHeadingType) => {
  const { COLOR } = useTheme();
  return (
    <Text
      color={COLOR.text.light}
      size={14}
      type="body"
      weight="400"
      letterSpacing={0.1}
      center={center}
    >
      {children}
    </Text>
  );
};

const styles = ({
  color,
  fontSize,
  fontFamily,
  letterSpacing,
  lineHeight,
  center,
}: TextStylesType) =>
  StyleSheet.create({
    text: {
      fontSize,
      fontFamily,
      letterSpacing,
      lineHeight,
      textAlign: center ? "center" : "left",
      color: color,
    },
  });
