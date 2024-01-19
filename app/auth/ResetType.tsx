import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Header } from "../../components/auth";
import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
  Text,
} from "../../components/general";
import {
  Check,
  Email,
  EmailWhite,
  Phone,
  Uncheck,
} from "../../assets/images/svgs";
import { useTheme } from "../../hooks";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const FORGOT_PASSWORD_DATA = [
  {
    type: "Email",
    icon: <EmailWhite width={20} height={20} />,
  },
  {
    type: "Phone Number",
    icon: <Phone width={20} height={20} />,
  },
];

export default function ResetType() {
  const { COLOR } = useTheme();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const params = useLocalSearchParams<any>();
  console.log("params", params);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.mainWrapper}>
        <Header type="arrow" />

        <View style={styles.mainWrapper}>
          <View style={styles.headingWrapper}>
            <MainHeading>Forgot Password</MainHeading>
            <MainTextLight>
              Dont worry! it happens. Please select your email or phone number
              so we can send you a code.
            </MainTextLight>
          </View>

          {params?.type?.toLowerCase() === "email" ? (
            <Input
              placeholder="Email"
              value={email}
              setValue={setEmail}
              iconLeft={<Email />}
            />
          ) : (
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              setValue={setPhoneNumber}
              iconLeft={<Phone />}
            />
          )}
        </View>
      </View>

      <View>
        <MainButton href="/auth/ActivateAccount?type=reset-password">
          Send Code
        </MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
    flexGrow: 1,
    justifyContent: "space-between",
  },

  mainWrapper: {
    gap: 32,
  },

  headingWrapper: {
    gap: 8,
  },

  main: {
    gap: 16,
  },

  option: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A3646",
    overflow: "hidden",
    padding: 20,
    gap: 16,
  },

  optionActive: {
    backgroundColor: "#FF9F29",
    borderColor: "#FF9F29",
  },
});
