import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, LayoutChangeEvent, Dimensions } from "react-native";
import { Error, Info, Success } from "../../assets/images/svgs";
import Constants from "expo-constants";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Text from "./Text";
import { useTheme } from "../../hooks";
import { ConfigProps, HideProps, ToastRef } from "../../types";

type ToastType = {
  ref: Ref<ToastRef>;
  onHide?: () => void;
};

export default function Toast({ ref, onHide }: ToastType) {
  const { COLOR } = useTheme();
  const [config, setConfig] = useState<ConfigProps>({
    duration: 0,
    text: "",
    type: "",
  });
  const visibleState = useRef(false);
  const timer = useRef<NodeJS.Timeout>();
  const [textLength, setTextLength] = useState(0);
  // const [toastHeight, setToastHeight] = useState(0);
  const transY = useSharedValue(-40);
  const width = useSharedValue(32);

  // useEffect(() => {
  //   if (config?.text && toastHeight && textLength) {
  //     transX.value = textLength + 12;
  //     showToast();
  //     timer.current = setTimeout(hide, 4000);
  //   }

  //   return () => {
  //     if (timer.current) clearTimeout(timer.current);
  //   };
  // }, [config, toastHeight, textLength]);

  useEffect(() => {
    if (config?.text) {
      // width.value = textLength + 12;
      // width.value = 36;
      showToast();
      timer.current = setTimeout(hide, 4000);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [config]);

  useEffect(() => {
    console.log("Thedre");
    show({
      duration: 500,
      text: "Hello",
      type: "success",
    });
  }, []);

  const show = ({ duration, text, type }: ConfigProps) => {
    setConfig({
      duration,
      text,
      type,
    });
  };

  const showToast = () => {
    if (!visibleState.current) {
      visibleState.current = true;
      transY.value = withTiming(Constants.statusBarHeight + 12, {
        duration: config?.duration,
      });
      width.value = withDelay(
        config?.duration,
        withTiming(
          textLength + 18 + 24 > Dimensions.get("screen").width
            ? Dimensions.get("screen").width
            : textLength + 18 + 24,
          { duration: config?.duration }
        )
      );
    }
  };

  const hide = (callback?: HideProps) => {
    if (timer.current) clearTimeout(timer.current);

    // transX.value = withTiming(textLength + 12, {
    //   duration: config?.duration,
    // });
    // transY.value = withDelay(
    //   config.duration,
    //   withTiming(
    //     -toastHeight,
    //     {
    //       duration: config?.duration,
    //       easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
    //     },
    //     () => runOnJS(onFinishHandler)(callback)
    //   )
    // );
  };

  const onFinishHandler = (callback?: HideProps) => {
    setConfig({
      text: "",
      duration: 0,
      type: "",
    });
    if (callback) setTimeout(callback, 200);
    if (visibleState.current) onHide && onHide();
    visibleState.current = false;
  };

  const generateIcon = () =>
    config?.type === "error" ? (
      <Error />
    ) : config?.type === "info" ? (
      <Info />
    ) : (
      <Success />
    );

  const generateBackgroundColor = () =>
    config?.type === "error"
      ? "#f00a1d"
      : config?.type === "info"
      ? "#0077ed"
      : "#4bb543";

  // const viewLayoutHandler = (event: LayoutChangeEvent) =>
  //   setToastHeight(event.nativeEvent.layout.height);

  const textLayouthandler = (event: LayoutChangeEvent) =>
    setTextLength(Math.floor(event.nativeEvent.layout.width));

  useImperativeHandle(ref, () => ({
    hide,
    show,
  }));

  const rOuterView = useAnimatedStyle(
    () => ({
      transform: [{ translateY: transY.value }],
      // opacity: interpolate(
      //   transY.value,
      //   [-toastHeight, Constants.statusBarHeight + 12],
      //   [0, 1]
      // ),
    }),
    []
  );

  const rView = useAnimatedStyle(
    () => ({
      // transform: [{ translateX: -width.value / 2 }],
      width: width.value,
    }),
    []
  );
  const rInnerView = useAnimatedStyle(
    () => ({
      transform: [{ translateX: width.value }],
    }),
    []
  );

  const rText = useAnimatedStyle(
    () => ({
      // opacity: interpolate(width.value, [0, textLength], [1, 0]),
    }),
    [textLength]
  );

  console.log(textLength);

  return (
    <Animated.View style={[styles.outerContainer, rOuterView]}>
      <Animated.View
        // onLayout={viewLayoutHandler}
        style={[
          styles.wrapper,
          rView,
          {
            backgroundColor: generateBackgroundColor(),
          },
        ]}
      >
        {/* <Animated.View
        style={[
          styles.container,
          rInnerView,
          { backgroundColor: generateBackgroundColor() },
        ]}
      > */}
        {generateIcon()}
        <Text
          color={COLOR.text.main}
          size={14}
          type="body"
          weight="600"
          letterSpacing={0.1}
          onLayout={textLayouthandler}
          // isAnimated={true}
          center
          style={[
            {
              // marginLeft: 12,
            },
            // rText,
          ]}
        >
          {config?.text}
        </Text>
        {/* </Animated.View> */}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    // top: 0,
    // left: 0,
    // right: 0,
    // marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    // width: 36,
    height: 32,
    paddingHorizontal: 4,
    borderRadius: 40,
    overflow: "hidden",
  },

  // outerContainer: {
  //   overflow: "hidden",
  //   borderRadius: 40,
  //   transform: [{ translateX: -70 / 2 }],
  //   backgroundColor: "blue",
  // },

  container: {
    flexDirection: "row",
    alignItems: "center",

    // justifyContent: "center",
    // alignItems: "center",

    // transform: [{ translateX: 70 }],
    // width: 36,
  },
});
