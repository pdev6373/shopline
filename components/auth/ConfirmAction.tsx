import {
  MainButton,
  MainHeading,
  MainTextLight,
  OTPInput,
  Text,
} from "../../components/general";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Header } from "../../components/auth";
import { useBiometrics, useTheme } from "../../hooks";
import { supabase } from "../../supabase";
import { useRouter } from "expo-router";

type ConfirmActionType = {
  email: string;
  type: "reset-password" | "signup";
  heading: string;
};

export default function ConfirmAction({
  email,
  type,
  heading,
}: ConfirmActionType) {
  const [token, setToken] = useState("");
  const { COLOR } = useTheme();
  const { isDeviceEnrolled } = useBiometrics();
  const router = useRouter();

  const splitEmail = email.split("@");

  useEffect(() => {
    if (token.length >= 6) confirmActionHandler();
  }, [token]);

  const sendNewCodeHandler = async () => {};
  const confirmActionHandler = async () => {
    try {
      if (type === "signup") {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: "signup",
        });

        if (error) throw error;
        if (data) {
          if (!isDeviceEnrolled) router.push("/main/_layout");
          else
            Platform.OS === "android"
              ? router.push("/auth/authScreens/EnableFingerprint")
              : router.push("/auth/authScreens/FaceRecognition");
        }
      } else {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: "recovery",
        });

        if (error) throw error;
        if (data) router.push("/auth/authScreens/NewPassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <View style={styles.main}>
        <View style={styles.headingWrapper}>
          <MainHeading>{heading}</MainHeading>
          <View>
            <MainTextLight>Enter the verification code sent to</MainTextLight>
            <Text
              color="#F8FAFC"
              size={14}
              type="body"
              weight="500"
              letterSpacing={0.1}
            >
              {`*******${splitEmail[0].slice(-4)}${splitEmail[1]}`}
            </Text>
          </View>
        </View>

        <OTPInput value={token} setValue={setToken} />

        <Pressable onPress={sendNewCodeHandler}>
          <Text
            size={16}
            weight="700"
            type="body"
            letterSpacing={0.4}
            color={COLOR.accent}
          >
            Send a new code
          </Text>
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <View>
          <MainButton onPress={confirmActionHandler}>Confirm</MainButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    gap: 24,
  },

  headingWrapper: {
    gap: 8,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
