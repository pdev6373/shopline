import { ScrollView, View } from "react-native";
import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
  SocialButton,
  Text,
} from "../../components/general";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useTheme } from "../../hooks";
import Email from "../../assets/images/svgs/mail.svg";
import Lock from "../../assets/images/svgs/lock.svg";
import EyeOff from "../../assets/images/svgs/eye-off.svg";
import Logo from "../../assets/images/svgs/logo-dark.svg";
import Google from "../../assets/images/svgs/google.svg";
import Apple from "../../assets/images/svgs/apple.svg";

export default function Login() {
  const { COLOR } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (value: string) => setEmail(value);
  const passwordHandler = (value: string) => setPassword(value);

  const googleSigninHandler = async () => {};
  const appleSigninHandler = async () => {};
  const signinHandler = async () => {};

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 32,
        gap: 32,
        flex: 1,
        marginBottom: 16,
      }}
    >
      <Logo width={44} height={44} />

      <View style={{ gap: 24 }}>
        <View>
          <MainHeading>Welcome back!</MainHeading>
          <MainTextLight>Please enter your details.</MainTextLight>
        </View>

        <View
          style={{
            gap: 16,
          }}
        >
          <Input
            iconLeft={<Email width={20} height={20} />}
            value={email}
            placeholder="Email"
            onChangeText={(value: string) => emailHandler(value)}
          />
          <Input
            iconLeft={<Lock width={20} height={20} />}
            iconRight={<EyeOff width={20} height={20} />}
            value={password}
            placeholder="Password"
            onChangeText={(value: string) => passwordHandler(value)}
          />

          <Link
            href=""
            style={{
              marginLeft: "auto",
            }}
          >
            <Text
              color={COLOR.accent}
              size={14}
              type="body"
              weight="700"
              letterSpacing={0.1}
            >
              Forgot Password?
            </Text>
          </Link>
        </View>

        <MainButton onPress={signinHandler}>Sign In</MainButton>
      </View>

      <View style={{ gap: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <LinearGradient
            colors={["#2A364600", "#2A3646"]}
            style={{ height: 1.5, flex: 1 }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
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
            style={{ height: 1.5, flex: 1 }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <SocialButton icon={<Google />} onPress={googleSigninHandler}>
            Google
          </SocialButton>
          <SocialButton icon={<Apple />} onPress={appleSigninHandler}>
            Apple
          </SocialButton>
        </View>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Text
          size={14}
          weight="400"
          color={COLOR.text.main}
          type="body"
          letterSpacing={0.1}
          center
        >
          Don’t have an account? Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}
