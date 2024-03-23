import { Redirect } from "expo-router";
import { useBiometrics } from "../hooks";

export default function Main() {
  const { isUnlocked } = useBiometrics();

  // return <Redirect href={"/auth"} />;
  return <Redirect href={"/main"} />;
}
