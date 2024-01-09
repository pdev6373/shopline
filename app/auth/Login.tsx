import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import {
  Input,
  MainButton,
  MainHeading,
  MainTextLight,
  Text,
} from "../../components/general";
import { useState } from "react";
import { useTheme } from "../../hooks";
import { Link } from "expo-router";

export default function Login() {
  const { COLOR } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (value: string) => setEmail(value);
  const passwordHandler = (value: string) => setPassword(value);

  const signinHandler = async () => {};

  return (
    <ScrollView contentContainerStyle={{ marginTop: 32 }}>
      <Image
        source={require("../../assets/images/svgs/logo-dark.svg")}
        style={{ width: 44, height: 44 }}
      />
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
            iconLeft={
              <Image
                source={require("../../assets/images/svgs/mail.svg")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            }
            iconRight={<></>}
            value={email}
            placeholder="Email"
            onChangeText={(value: string) => emailHandler(value)}
          />
          <Input
            iconLeft={<></>}
            iconRight={<></>}
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
    </ScrollView>
  );
}
