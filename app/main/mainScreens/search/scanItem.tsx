import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function scanItem() {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = useCallback(async () => {
    if (!hasPermission) {
      const permission = requestPermission();
      if (!permission) await Linking.openSettings();
    }
  }, []);

  //    if (device == null) return <NoCameraDeviceError />; create error
  if (device == null) return <></>;

  return (
    <View
      style={{
        // width: 287,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF33",
      }}
      onLayout={() => setIsInitialised(true)}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          borderWidth: 20,
          borderColor: "#ff00ff1a",
          zIndex: 10000,
        }}
      />
      <Camera
        style={
          isInitialised
            ? StyleSheet.absoluteFill
            : {
                width: 0,
                height: 0,
              }
        }
        resizeMode={"contain"}
        device={device}
        isActive={true}
        enableZoomGesture
      />
    </View>
  );
}
