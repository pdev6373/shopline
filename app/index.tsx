import { Redirect } from "expo-router";
import { useBiometrics } from "../hooks";
import { Status500 } from "../components/app-status";

export default function Main() {
  const { isUnlocked } = useBiometrics();

  // return <Redirect href={"/auth"} />;
  return <Status500 />;
}
