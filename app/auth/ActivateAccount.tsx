import {
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../components/general";
import { Cancel } from "../../assets/images/svgs";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

export default function ActivateAccount() {
  const [verificationCode, setVerificationCode] = useState("");

  const activateAccountHandler = async () => {};

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Cancel width={24} height={24} />

      <View style={styles.main}>
        <View>
          <MainHeading>Activate Account</MainHeading>
          <MainTextLight>Enter the verification code sent to</MainTextLight>
          <MainTextLight>*******dyne@mail.com</MainTextLight>
        </View>

        <View style={styles.inputWrapper}>
          {/* <Input
            iconLeft={input.iconLeft}
            iconRight={input.iconRight}
            value={input.value}
            placeholder={input.placeholder}
            onChangeText={(value: string) => input.handler(value)}
          /> */}

          {/* Send a new code */}

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
