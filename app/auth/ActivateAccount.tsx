import {
  MainButton,
  MainHeading,
  MainTextLight,
  OTPInput,
  Text,
} from "../../components/general";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Header } from "../../components/auth";
import { useTheme } from "../../hooks";
import { supabase } from "../../supabase";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ActivateAccount() {
  const [token, setToken] = useState("");
  const { COLOR } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();

  const splitEmail = email.split("@");

  useEffect(() => {
    if (token.length >= 6) activateAccountHandler();
  }, [token]);

  const sendNewCodeHandler = async () => {};
  const activateAccountHandler = async () => {
    console.log(token);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (error) throw error;
      if (data) {
        console.log(data);
        router.push("/auth/EnableFingerprint");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      <Header />

      <View style={styles.main}>
        <View style={styles.headingWrapper}>
          <MainHeading>Activate Account</MainHeading>
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
          <MainButton onPress={activateAccountHandler}>Confirm</MainButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
    flexGrow: 1,
  },

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
