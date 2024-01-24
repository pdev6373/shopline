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
  Google,
  User,
} from "../../assets/images/svgs";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks";
import { supabase } from "../../supabase";
import { ErrorType } from "../../types";
import { Header } from "../../components/auth";

const GRADIENT_START = { x: 0, y: 0.5 };
const GRADIENT_END = { x: 1, y: 0.5 };
const AUTH_CONSTANTS = {
  emailPlaceholder: "Email",
  emailIcon: <Email width={20} height={20} />,
  passwordPlaceholder: "Password",
  passowrdIcon: <Lock width={20} height={20} />,
  togglePasswordIcon: <EyeOff width={20} height={20} />,
  signIn: "Sign In",
  signUp: "Sign Up",
};

const AUTH_DATA = {
  signin: {
    header: <Header type="logo" />,
    heading: "Welcome back!",
    subHeading: "Please enter your details.",
    inputs: [
      {
        iconLeft: AUTH_CONSTANTS.emailIcon,
        iconRight: <></>,
        placeholder: AUTH_CONSTANTS.emailPlaceholder,
        name: "email",
      },
      {
        iconLeft: AUTH_CONSTANTS.passowrdIcon,
        iconRight: AUTH_CONSTANTS.togglePasswordIcon,
        placeholder: AUTH_CONSTANTS.passwordPlaceholder,
        name: "password",
      },
    ],
    buttonText: AUTH_CONSTANTS.signIn,
    forgotPassword: "Forgot Password?",
    accountQuestion: "Don’t have an account? ",
    accountQuestionType: AUTH_CONSTANTS.signUp,
  },
  signup: {
    header: <Header route={"/auth/"} />,
    heading: "Welcome!",
    subHeading: "Let’s get started with a free Shopline account.",
    inputs: [
      {
        iconLeft: <User width={20} height={20} />,
        iconRight: <></>,
        placeholder: "Fullname",
        name: "fullname",
      },
      {
        iconLeft: AUTH_CONSTANTS.emailIcon,
        iconRight: <></>,
        placeholder: AUTH_CONSTANTS.emailPlaceholder,
        name: "email",
      },
      {
        iconLeft: AUTH_CONSTANTS.passowrdIcon,
        iconRight: AUTH_CONSTANTS.togglePasswordIcon,
        placeholder: AUTH_CONSTANTS.passwordPlaceholder,
        name: "password",
      },
    ],
    buttonText: AUTH_CONSTANTS.signUp,
    forgotPassword: "",
    accountQuestion: "Already have an account? ",
    accountQuestionType: AUTH_CONSTANTS.signIn,
  },
};

export default function Auth() {
  const router = useRouter();
  const { COLOR } = useTheme();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"signup" | "signin">(
    "signin"
  );
  const [currentScreenData, setCurrentScreenData] = useState(
    AUTH_DATA[currentScreen]
  );
  const [error, setError] = useState<
    ErrorType<"email" | "password" | "fullname">
  >({
    field: "",
    message: "",
  });

  useEffect(() => {
    setCurrentScreenData(AUTH_DATA[currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    setCurrentScreen(params.type === "signup" ? "signup" : "signin");
  }, [params]);

  const navigationType = () =>
    currentScreen === "signin" ? "signup" : "signin";

  const signinHandler = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError({
        field: "email",
        message: "Invalid email address",
      });

      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async () => {
    if (!fullname) {
      setError({
        field: "fullname",
        message: "Fullname is required",
      });

      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError({
        field: "email",
        message: "Invalid email address",
      });

      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            fullname,
          },
        },
      });

      if (error) throw error;
      if (!data.session)
        router.push({
          pathname: "/auth/ActivateAccount",
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
  const googleSigninHandler = async () => {};
  const appleSigninHandler = async () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      {currentScreenData.header}

      <View style={styles.main}>
        <View style={styles.headingWrapper}>
          <MainHeading>{currentScreenData.heading}</MainHeading>
          <MainTextLight>{currentScreenData.subHeading}</MainTextLight>
        </View>

        <View style={styles.inputWrapper}>
          {currentScreenData.inputs.map((input) => (
            <Input
              key={input.placeholder}
              iconLeft={input.iconLeft}
              iconRight={input.iconRight}
              value={
                input.name === "email"
                  ? email
                  : input.name === "password"
                  ? password
                  : fullname
              }
              placeholder={input.placeholder}
              setValue={(value) => {
                input.name === "email"
                  ? setEmail(value)
                  : input.name === "password"
                  ? setPassword(value)
                  : setFullname(value);
              }}
              errorMessage={
                error.field === input.placeholder.toLowerCase()
                  ? error.message
                  : ""
              }
              setError={setError}
            />
          ))}

          {currentScreenData?.forgotPassword ? (
            <Link href="/auth/ResetPassword" style={styles.forgotPassword}>
              <Text
                color={COLOR.accent}
                size={14}
                type="body"
                weight="700"
                letterSpacing={0.1}
              >
                {currentScreenData.forgotPassword}
              </Text>
            </Link>
          ) : (
            <></>
          )}
        </View>

        <MainButton
          onPress={currentScreen === "signin" ? signinHandler : signupHandler}
          disabled={
            !email || !password || (currentScreen === "signup" && !fullname)
          }
        >
          {currentScreenData.buttonText}
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

      <Link
        href={`/auth?type=${navigationType()}`}
        asChild
        style={styles.noAccount}
      >
        <Pressable style={styles.accountQuestion}>
          <Text
            size={14}
            weight="400"
            color={COLOR.text.main}
            type="body"
            letterSpacing={0.1}
          >
            {currentScreenData.accountQuestion}
          </Text>
          <Text
            size={14}
            weight="700"
            type="body"
            letterSpacing={0.1}
            color={COLOR.accent}
          >
            {currentScreenData.accountQuestionType}
          </Text>
        </Pressable>
      </Link>
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

  accountQuestion: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
