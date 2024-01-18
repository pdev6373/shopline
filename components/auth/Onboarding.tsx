import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { MainButton, MainHeading, MainTextLight, Text } from "../general";
import { useTheme } from "../../hooks";
import { Data } from "../../constants";
import { useRef, useState } from "react";

type OnboardingType = {
  image: JSX.Element;
  heading: string;
  body: string;
  href?: string;
};

type OnboardingStylesType = {
  activeColor: string;
  inactiveColor: string;
  width: number;
};

export default function Onboarding() {
  const { COLOR } = useTheme();
  const { width } = useWindowDimensions();
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const Styles = styles({
    activeColor: COLOR.indicator.main,
    inactiveColor: COLOR.indicator.secondary,
    width,
  });

  return (
    <View style={Styles.wrapper}>
      <View style={Styles.innerWrapper}>
        <FlatList
          ref={slidesRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          data={Data.onboarding}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[Styles.wrapper, Styles.fullWidth]}>
              <Image
                source={item.image}
                style={[Styles.image, Styles.fullWidth]}
                //       style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
              />
              <View style={Styles.main}>
                <MainHeading>{item.title}</MainHeading>
                <MainTextLight>{item.description}</MainTextLight>
              </View>

              <View style={Styles.buttonWrapper}>
                <MainButton onPress={() => {}}>Get Started</MainButton>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );

  // return (
  //   <ScrollView contentContainerStyle={Styles.wrapper}>

  //     <View style={Styles.indicators}>
  //       <View style={[Styles.indicator, Styles.indicatorActive]} />
  //       <View style={Styles.indicator} />
  //       <View style={Styles.indicator} />
  //     </View>

  //     <View
  //       style={{
  //         flexDirection: "row",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flexWrap: "wrap",
  //         maxWidth: 293,
  //       }}
  //     >
  //       <Text
  //         color={COLOR.text.main}
  //         size={10}
  //         type="body"
  //         weight="400"
  //         letterSpacing={0.2}
  //       >
  //         {`By taping “Get Started” and using the Shopline app, you’re agreeing to our `}
  //       </Text>
  //       <Text
  //         color={COLOR.accent}
  //         size={10}
  //         type="body"
  //         weight="500"
  //         letterSpacing={0.2}
  //       >
  //         {`terms of service `}
  //       </Text>
  //       <Text
  //         color={COLOR.text.main}
  //         size={10}
  //         type="body"
  //         weight="400"
  //         letterSpacing={0.2}
  //       >
  //         {`and `}
  //       </Text>
  //       <Text
  //         color={COLOR.accent}
  //         size={10}
  //         type="body"
  //         weight="500"
  //         letterSpacing={0.2}
  //       >
  //         privacy policy.
  //       </Text>
  //     </View>
  //   </ScrollView>
  // );
}

const styles = ({ activeColor, inactiveColor, width }: OnboardingStylesType) =>
  StyleSheet.create({
    // wrapper: {
    //   alignItems: "center",
    //   // marginTop: 89 + Constants.statusBarHeight,
    //   marginTop: 89,
    // },

    buttonWrapper: {
      width: "100%",
      marginVertical: 24,
    },

    // indicators: {
    //   flexDirection: "row",
    //   gap: 6,
    // },

    // indicator: {
    //   width: 6,
    //   height: 6,
    //   borderRadius: 1000,
    //   backgroundColor: inactiveColor,
    // },

    // indicatorActive: {
    //   width: 32,
    //   backgroundColor: activeColor,
    // },

    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    fullWidth: {
      width,
    },

    image: {
      flex: 0.7,
      justifyContent: "center",
      resizeMode: "contain",
    },

    main: {
      flex: 0.3,
      //
      gap: 8,
      maxWidth: 327,
      alignItems: "center",
      marginBottom: 32,
    },

    innerWrapper: {
      flex: 3,
    },
  });
