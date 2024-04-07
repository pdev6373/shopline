import { Image, StyleSheet, View } from "react-native";
import { MainButton, Text } from "../../components/general";
import { Apple, EmailWhite, Google } from "../../assets/images/svgs";
import { useRouter } from "expo-router";
import { useAuthentication } from "../../hooks";
const signup = require("../../assets/images/pngs/signup.png");

type RegisterationType = "email" | "google" | "apple";

type RegisterationOptionsType = {
  type: RegisterationType;
  text: string;
  icon: JSX.Element;
};

const registerationOptions: RegisterationOptionsType[] = [
  {
    type: "email",
    text: "Continue with Email",
    icon: <EmailWhite />,
  },
  {
    type: "google",
    text: "Continue with Google",
    icon: <Google />,
  },
  {
    type: "apple",
    text: "Continue with Apple",
    icon: <Apple />,
  },
];

export default function register() {
  const router = useRouter();
  const { appleSignin, googleSignin } = useAuthentication();

  const registerationHandler = (type: RegisterationType) => {
    switch (type) {
      case "email":
        router.push("/auth/?type=signup");
        break;
      case "apple":
        appleSignin.request();
        break;
      case "google":
        googleSignin.request();
        break;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image source={signup} style={styles.image} />
      </View>

      <View style={styles.main}>
        <View style={styles.mainTexts}>
          <Text size={28} weight="700" color="#F8FAFC" center type="heading">
            Shopline
          </Text>

          <Text
            size={14}
            weight="400"
            color="#64748B"
            type="body"
            letterSpacing={0.1}
            center
          >
            One best app for all your needs.
          </Text>
        </View>

        <View style={styles.options}>
          {registerationOptions.map((option) => (
            <MainButton
              onPress={() => registerationHandler(option.type)}
              key={option.type}
              type="secondary"
              iconLeft={option.icon}
            >
              {option.text}
            </MainButton>
          ))}
        </View>

        <Text
          color="#f8fafc"
          size={14}
          type="body"
          weight="400"
          center
          letterSpacing={0.1}
          style={styles.bottomText}
        >
          <>
            Already have an account?{" "}
            <Text
              color="#ff9f29"
              size={14}
              type="body"
              weight="500"
              center
              letterSpacing={0.1}
              style={styles.bottomText}
            >
              Sign In
            </Text>
          </>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0F172A",
    flex: 1,
  },

  imageWrapper: {
    width: "100%",
    paddingHorizontal: 14,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.9398496 / 1,
  },

  main: {
    flex: 1,
    paddingBottom: 8,
    gap: 32,
    marginHorizontal: 24,
  },

  bottomText: {
    marginTop: "auto",
  },

  mainTexts: {
    gap: 8,
  },

  options: {
    gap: 16,
  },
});
