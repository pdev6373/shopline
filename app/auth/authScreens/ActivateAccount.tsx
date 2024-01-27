import { ConfirmAction } from "../../../components/auth";
import { useLocalSearchParams } from "expo-router";

export default function ActivateAccount() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <ConfirmAction email={email} heading="Activate Account" type="signup" />
  );
}
