import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "../../components/auth";
import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../components/general";
import { Email, Phone } from "../../assets/images/svgs";
import { useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";

type ResetTypeType = {
  type: "phone-number" | "email";
};

export default function ResetType({ type }: ResetTypeType) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const [error, setError] = useState({
    field: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const resetPasswordByPhoneNumberHandler = async () => {};

  const resetPasswordByEmailHandler = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError({
        field: "email",
        message: "Invalid email address",
      });

      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      console.log("data", data);
      console.log("error", error);

      if (error) throw error;
      if (data)
        router.push({
          pathname: "/auth/VerifyAccount",
          params: {
            email,
          },
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

          {type === "email" ? (
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
        <MainButton
          onPress={
            type === "email"
              ? resetPasswordByEmailHandler
              : resetPasswordByPhoneNumberHandler
          }
          disabled={
            (type === "email" && !email) ||
            (type === "phone-number" && !phoneNumber)
          }
        >
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
