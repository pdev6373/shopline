import { Onboarding } from "../../components/auth";
// import OnboardingOne from "../../assets/images/pngs/onboarding-one.png";
const OnboardingThree = require("../../assets/images/pngs/onboarding-three.png");
import { Image } from "expo-image";

export default function NewPassword() {
  return (
    <Onboarding
      heading="Follow and get update from favorite store"
      body="Easy shopping for all your needs just in hand, trusted by millions of people in the world."
      image={
        <Image
          source={OnboardingThree}
          style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
        />
      }
      href="/auth/EnableFingerprint"
    />
  );
}
