import { authenticateAsync, isEnrolledAsync } from "expo-local-authentication";
import { useState } from "react";

export default function useBiometrics() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const isDeviceEnrolled = async () => {
    const response = await isEnrolledAsync();
    return response;
  };

  const unlockAppHandler = async () => {
    const response = await authenticateAsync();
    if (response.success) setIsUnlocked(true);
    else setIsUnlocked(false);
    return response.success;
  };

  return {
    isUnlocked,
    isDeviceEnrolled,
    unlockAppHandler,
  };
}
