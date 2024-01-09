import { ScrollView, StyleSheet, View } from "react-native";
import { MainButton, MainHeading, MainTextLight, Text } from "../general";
import { useTheme } from "../../hooks";

type OnboardingType = {
  image: JSX.Element;
  heading: string;
  body: string;
  href?: string;
};

type OnboardingStylesType = {
  activeColor: string;
  inactiveColor: string;
};

export default function Onboarding({
  image,
  heading,
  body,
  href,
}: OnboardingType) {
  const { COLOR } = useTheme();

  const Styles = styles({
    activeColor: COLOR.indicator.main,
    inactiveColor: COLOR.indicator.secondary,
  });

  return (
    <ScrollView contentContainerStyle={Styles.wrapper}>
      {image}
      <View
        style={{
          gap: 8,
          maxWidth: 327,
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <MainHeading>{heading}</MainHeading>
        <MainTextLight>{body}</MainTextLight>
      </View>

      <View style={Styles.indicators}>
        <View style={[Styles.indicator, Styles.indicatorActive]} />
        <View style={Styles.indicator} />
        <View style={Styles.indicator} />
      </View>

      <View style={Styles.buttonWrapper}>
        <MainButton href={href}>Get Started</MainButton>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          maxWidth: 293,
        }}
      >
        <Text
          color={COLOR.text.main}
          size={10}
          type="body"
          weight="400"
          letterSpacing={0.2}
        >
          {`By taping “Get Started” and using the Shopline app, you’re agreeing to our `}
        </Text>
        <Text
          color={COLOR.accent}
          size={10}
          type="body"
          weight="500"
          letterSpacing={0.2}
        >
          {`terms of service `}
        </Text>
        <Text
          color={COLOR.text.main}
          size={10}
          type="body"
          weight="400"
          letterSpacing={0.2}
        >
          {`and `}
        </Text>
        <Text
          color={COLOR.accent}
          size={10}
          type="body"
          weight="500"
          letterSpacing={0.2}
        >
          privacy policy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = ({ activeColor, inactiveColor }: OnboardingStylesType) =>
  StyleSheet.create({
    wrapper: {
      alignItems: "center",
      // marginTop: 89 + Constants.statusBarHeight,
      marginTop: 89,
    },

    buttonWrapper: {
      width: "100%",
      marginVertical: 24,
    },

    indicators: {
      flexDirection: "row",
      gap: 6,
    },

    indicator: {
      width: 6,
      height: 6,
      borderRadius: 1000,
      backgroundColor: inactiveColor,
    },

    indicatorActive: {
      width: 32,
      backgroundColor: activeColor,
    },
  });
