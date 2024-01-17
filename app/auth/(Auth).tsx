import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
  SocialButton,
  Text,
} from "../../components/general";
import {
  Apple,
  Email,
  Lock,
  EyeOff,
  LogoDark,
  Google,
  User,
  Cancel,
} from "../../assets/images/svgs";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import { useTheme } from "../../hooks";
import { supabase } from "../../supabase";

const GRADIENT_START = { x: 0, y: 0.5 };
const GRADIENT_END = { x: 1, y: 0.5 };
const AUTH_DATA = {
  signinIcon: <LogoDark width={44} height={44} />,
  signinHeading: "Welcome back!",
  signinSubHeading: "Please enter your details.",
  signupIcon: <Cancel width={24} height={24} />,
  signupHeading: "Welcome!",
  signupSubHeading: "Let’s get started with a free Shopline account.",
  emailPlaceholder: "Email",
  passwordPlaceholder: "Password",
  fullnamePlaceholder: "Fullname",
  emailIcon: <Email width={20} height={20} />,
  passowrdIcon: <Lock width={20} height={20} />,
  togglePasswordIcon: <EyeOff width={20} height={20} />,
  userIcon: <User width={20} height={20} />,
  signinButtonText: "Sign In",
  signupButtonText: "Sign Up",
  forgotPassword: "Forgot Password?",
};

export default function Auth() {
  const { COLOR } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const authData = {
    sigin: {
      icon: AUTH_DATA.signinIcon,
      heading: AUTH_DATA.signinHeading,
      subHeading: AUTH_DATA.signinSubHeading,
      inputs: [
        {
          iconLeft: AUTH_DATA.emailIcon,
          iconRight: <></>,
          placeholder: AUTH_DATA.emailPlaceholder,
          value: email,
          handler: (value: string) => setEmail(value),
        },
        {
          iconLeft: AUTH_DATA.passowrdIcon,
          iconRight: AUTH_DATA.togglePasswordIcon,
          placeholder: AUTH_DATA.passwordPlaceholder,
          value: password,
          handler: (value: string) => setPassword(value),
        },
      ],
      buttonText: AUTH_DATA.signinButtonText,
      forgotPassword: AUTH_DATA.forgotPassword,
    },
    signup: {
      icon: AUTH_DATA.signupIcon,
      heading: AUTH_DATA.signupHeading,
      subHeading: AUTH_DATA.signupSubHeading,
      inputs: [
        {
          iconLeft: AUTH_DATA.userIcon,
          iconRight: <></>,
          placeholder: AUTH_DATA.fullnamePlaceholder,
          value: fullname,
          handler: (value: string) => setFullname(value),
        },
        {
          iconLeft: AUTH_DATA.emailIcon,
          iconRight: <></>,
          placeholder: AUTH_DATA.emailPlaceholder,
          value: email,
          handler: (value: string) => setEmail(value),
        },
        {
          iconLeft: AUTH_DATA.passowrdIcon,
          iconRight: AUTH_DATA.togglePasswordIcon,
          placeholder: AUTH_DATA.passwordPlaceholder,
          value: password,
          handler: (value: string) => setPassword(value),
        },
      ],
      buttonText: AUTH_DATA.signupButtonText,
    },
  };

  const signinHandler = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async () => {
    setLoading(true);

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        // fullname,
        email,
        password,
      });

      if (error) throw new Error(error);
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const googleSigninHandler = async () => {};
  const appleSigninHandler = async () => {};

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {authData.sigin.icon}

      <View style={styles.main}>
        <View>
          <MainHeading>{authData.sigin.heading}</MainHeading>
          <MainTextLight>{authData.sigin.subHeading}</MainTextLight>
        </View>

        <View style={styles.inputWrapper}>
          {authData.sigin.inputs.map((input) => (
            <Input
              iconLeft={input.iconLeft}
              iconRight={input.iconRight}
              value={input.value}
              placeholder={input.placeholder}
              onChangeText={(value: string) => input.handler(value)}
            />
          ))}

          <Link href="" style={styles.forgotPassword}>
            <Text
              color={COLOR.accent}
              size={14}
              type="body"
              weight="700"
              letterSpacing={0.1}
            >
              {authData.sigin.forgotPassword}
            </Text>
          </Link>
        </View>

        <MainButton onPress={signinHandler}>
          {authData.sigin.buttonText}
        </MainButton>
      </View>

      <View style={styles.main}>
        <View style={styles.signinAlt}>
          <LinearGradient
            colors={["#2A364600", "#2A3646"]}
            style={styles.altLine}
            start={GRADIENT_START}
            end={GRADIENT_END}
          />

          <Text
            size={14}
            weight="400"
            color={COLOR.text.main}
            type="body"
            letterSpacing={0.1}
            center
          >
            Or sign in with
          </Text>

          <LinearGradient
            colors={["#2A3646", "#2A364600"]}
            style={styles.altLine}
            start={GRADIENT_START}
            end={GRADIENT_END}
          />
        </View>

        <View style={styles.authButtons}>
          <SocialButton icon={<Google />} onPress={googleSigninHandler}>
            Google
          </SocialButton>
          <SocialButton icon={<Apple />} onPress={appleSigninHandler}>
            Apple
          </SocialButton>
        </View>
      </View>

      <View style={styles.noAccount}>
        <Text
          size={14}
          weight="400"
          color={COLOR.text.main}
          type="body"
          letterSpacing={0.1}
          center
        >
          {`Don’t have an account? ${authData.sigin.buttonText}`}
        </Text>
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
