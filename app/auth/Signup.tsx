import { Onboarding } from "../../components/auth";
// import OnboardingOne from "../../assets/images/pngs/onboarding-one.png";
const OnboardingTwo = require("../../assets/images/pngs/onboarding-two.png");
import { Image } from "expo-image";

export default function Signup() {
  return (
    <Onboarding
      heading="Get real-time updates for all deliveries"
      body="Easy shopping for all your needs just in hand, trusted by millions of people in the world."
      image={
        <Image
          source={OnboardingTwo}
          style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
        />
      }
      href="/auth/NewPassword"
    />
  );
}
