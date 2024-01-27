import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
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
  const [toastHeight, setToastHeight] = useState(0);
  const transY = useSharedValue(0);
  const transX = useSharedValue(0);

  useEffect(() => {
    if (toastHeight) transY.value = -toastHeight;
  }, [toastHeight]);

  useEffect(() => {
    if (config?.text && toastHeight && textLength) {
      transX.value = textLength + 12;
      showToast();
      timer.current = setTimeout(hide, 4000);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [config, toastHeight, textLength]);

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
      transY.value = withTiming(80, {
        duration: config?.duration,
      });
      transX.value = withDelay(
        config?.duration,
        withTiming(0, { duration: config?.duration })
      );
    }
  };

  const hide = (callback?: HideProps) => {
    if (timer.current) clearTimeout(timer.current);

    transX.value = withTiming(textLength + 12, {
      duration: config?.duration,
    });
    transY.value = withDelay(
      config.duration,
      withTiming(
        -toastHeight,
        {
          duration: config?.duration,
          easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
        },
        () => runOnJS(onFinishHandler)(callback)
      )
    );
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
      <Error width={30} height={30} />
    ) : config?.type === "info" ? (
      <Info width={30} height={30} />
    ) : (
      <Success width={30} height={30} />
    );

  const generateBackgroundColor = () =>
    config?.type === "error"
      ? "#f00a1d"
      : config?.type === "info"
      ? "#0077ed"
      : "#1f8503";

  const viewLayoutHandler = (event: LayoutChangeEvent) =>
    setToastHeight(event.nativeEvent.layout.height);

  const textLayouthandler = (event: LayoutChangeEvent) =>
    setTextLength(Math.floor(event.nativeEvent.layout.width));

  useImperativeHandle(ref, () => ({
    hide,
    show,
  }));

  const rView = useAnimatedStyle(
    () => ({
      transform: [{ translateY: transY.value }],
      opacity: interpolate(transY.value, [-toastHeight, 80], [0, 1]),
    }),
    []
  );

  const rOuterView = useAnimatedStyle(
    () => ({
      transform: [{ translateX: -transX.value / 2 }],
    }),
    []
  );

  const rInnerView = useAnimatedStyle(
    () => ({
      transform: [{ translateX: transX.value }],
    }),
    []
  );

  const rText = useAnimatedStyle(
    () => ({
      opacity: interpolate(transX.value, [0, textLength], [1, 0]),
    }),
    [textLength]
  );

  return (
    <Animated.View onLayout={viewLayoutHandler} style={[styles.wrapper, rView]}>
      <Animated.View style={[styles.outerContainer, rOuterView]}>
        <Animated.View
          style={[
            styles.container,
            rInnerView,
            { backgroundColor: generateBackgroundColor() },
          ]}
        >
          {generateIcon()}
          <Text
            color={COLOR.text.main}
            size={16}
            type="body"
            weight="600"
            letterSpacing={0.1}
            marginLeft={12}
            onLayout={textLayouthandler}
            isAnimated={true}
            center
            style={[
              {
                marginLeft: 12,
              },
              rText,
            ]}
          >
            {config?.text}
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    // top: Constants.statusBarHeight + 24,
    top: 0,
    zIndex: 100,
    marginHorizontal: 24,
  },

  outerContainer: {
    overflow: "hidden",
    borderRadius: 40,
    transform: [{ translateX: -70 / 2 }],
  },

  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 40,
    transform: [{ translateX: 70 }],
  },
});
