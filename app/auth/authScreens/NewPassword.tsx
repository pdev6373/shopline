import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../../components/general";
import { Lock, EyeOff } from "../../../assets/images/svgs";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { supabase } from "../../../supabase";
import { ErrorType } from "../../../types";
import { Header } from "../../../components/auth";

export default function NewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<
    ErrorType<"password" | "confirm-password">
  >({
    field: "",
    message: "",
  });

  const changePasswordHandler = async () => {
    if (password !== confirmPassword) {
      setError({
        field: "confirm-password",
        message: "Password does not match",
      });

      return;
    }

    setLoading(true);
    try {
      const { error, data } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header type="arrow" />

      <View style={styles.headingWrapper}>
        <MainHeading>New Password</MainHeading>
        <View style={styles.headingTitle}>
          <MainTextLight>
            Your password must different from previous password.
          </MainTextLight>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Input
          iconLeft={<Lock width={20} height={20} />}
          iconRight={<EyeOff width={20} height={20} />}
          value={password}
          placeholder={"New password"}
          setValue={(value) => {
            setPassword(value);
          }}
          errorMessage={error.field === "password" ? error.message : ""}
          setError={setError}
        />

        <Input
          iconLeft={<Lock width={20} height={20} />}
          iconRight={<EyeOff width={20} height={20} />}
          value={confirmPassword}
          placeholder={"Confirm password"}
          setValue={(value) => {
            setConfirmPassword(value);
          }}
          errorMessage={error.field === "confirm-password" ? error.message : ""}
          setError={setError}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <MainButton
          onPress={changePasswordHandler}
          disabled={!password || !confirmPassword}
        >
          Continue
        </MainButton>
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

  headingTitle: {
    maxWidth: 200,
  },

  inputWrapper: {
    gap: 16,
  },

  buttonWrapper: {
    marginTop: "auto",
  },
});
