import { Onboarding } from "../../components/auth";
// import OnboardingOne from "../../assets/images/pngs/onboarding-one.png";
const OnboardingOne = require("../../assets/images/pngs/onboarding-one.png");
import { Image } from "expo-image";

export default function Login() {
  return (
    <Onboarding
      heading="One best app for all your needs"
      body="Easy shopping for all your needs just in hand, trusted by millions of people in the world."
      image={
        <Image
          source={OnboardingOne}
          style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
        />
      }
      href="/auth/Signup"
    />
  );
}
