import { useState } from "react";

export default function useBiometrics() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return {
    isUnlocked,
  };
}
