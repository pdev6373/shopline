import {
  MainButton,
  MainHeading,
  MainTextLight,
  OTPInput,
  Text,
} from "../../components/general";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Header } from "../../components/auth";
import { useTheme } from "../../hooks";

export default function ActivateAccount() {
  const [verificationCode, setVerificationCode] = useState("");
  const { COLOR } = useTheme();

  const sendNewCodeHandler = async () => {};
  const activateAccountHandler = async () => {};

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Header />

      <View style={styles.main}>
        <View>
          <MainHeading>Activate Account</MainHeading>
          <MainTextLight>Enter the verification code sent to</MainTextLight>
          <MainTextLight>*******dyne@mail.com</MainTextLight>
        </View>

        <View style={styles.inputWrapper}>
          <OTPInput value={verificationCode} setValue={setVerificationCode} />

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

          <MainButton onPress={activateAccountHandler}>Confirm</MainButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    gap: 32,
    flex: 1,
    marginBottom: 16,
  },

  main: {
    gap: 24,
  },

  inputWrapper: {
    gap: 16,
  },

  forgotPassword: {
    marginLeft: "auto",
  },

  signinAlt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  altLine: {
    height: 1.5,
    flex: 1,
  },

  authButtons: {
    flexDirection: "row",
    gap: 12,
  },

  noAccount: {
    marginTop: "auto",
  },
});
