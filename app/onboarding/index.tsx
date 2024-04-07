import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Data, ONBOARDING_KEY } from "../../constants";
import { useTheme } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { MainButton, Text } from "../../components/general";
import Constants from "expo-constants";

type OnboardingStylesType = {
  width: number;
  height: number;
};

export default function Onboarding() {
  const { COLOR } = useTheme();
  const { width, height } = useWindowDimensions();
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const Styles = styles({
    width,
    height,
  });

  const finishOnboardingHandler = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      router.push("/onboarding/Register");
    } catch (err) {
      console.log("Error @setOnboarding", err);
    }
  };

  return (
    <View style={Styles.wrapper}>
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
          <View style={Styles.container}>
            <View style={Styles.imageWrapper}>
              <Image source={item.image} style={Styles.image} />
            </View>

            <View style={Styles.main}>
              <Text
                size={28}
                weight="700"
                color="#F8FAFC"
                center
                type="heading"
              >
                {item.title}
              </Text>

              <Text
                size={14}
                weight="400"
                color="#64748B"
                type="body"
                letterSpacing={0.1}
                center
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={Styles.bottom}>
        <View style={Styles.paginator}>
          {Data?.onboarding?.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [6, 32, 6],
              extrapolate: "clamp",
            });

            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: [
                COLOR.indicator.secondary,
                COLOR.indicator.main,
                COLOR.indicator.secondary,
              ],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                style={[Styles.dot, { width: dotWidth, backgroundColor }]}
                key={index}
              />
            );
          })}
        </View>

        <View>
          <MainButton onPress={finishOnboardingHandler}>Get Started</MainButton>
        </View>

        <Text
          size={10}
          color="#f8fafc"
          center
          letterSpacing={0.2}
          type="body"
          weight="400"
          style={Styles.bottomText}
        >
          <>
            By taping “Get Started” and using the Shopline app, you’re agreeing
            to our{" "}
            <Text
              size={10}
              color="#ff9f29"
              center
              letterSpacing={0.2}
              type="body"
              weight="500"
            >
              terms of service
            </Text>{" "}
            and{" "}
            <Text
              size={10}
              color="#ff9f29"
              center
              letterSpacing={0.2}
              type="body"
              weight="500"
            >
              privacy policy
            </Text>
            .
          </>
        </Text>
      </View>
    </View>
  );
}

const styles = ({ width, height }: OnboardingStylesType) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: "#0F172A",
      overflow: "hidden",
      paddingTop: height * 0.1096 + Constants.statusBarHeight,
    },

    container: {
      width,
      paddingHorizontal: 24,
      gap: 24,
      paddingBottom: 32,
    },

    imageWrapper: {
      width: "100%",
      paddingHorizontal: 14,
    },

    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 1.03 / 1,
    },

    main: {
      gap: 8,
    },

    bottom: {
      gap: 24,
      paddingHorizontal: 24,
      paddingBottom: 8,
    },

    paginator: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    },

    dot: {
      height: 6,
      borderRadius: 1000,
    },

    bottomText: {
      paddingHorizontal: 17,
    },
  });
