import { ConfirmAction } from "../../../components/auth";
import { useLocalSearchParams } from "expo-router";

export default function VerifyAccount() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <ConfirmAction
      email={email}
      heading="Verify Account"
      type="reset-password"
    />
  );
}
