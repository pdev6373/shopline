import { Redirect } from "expo-router";
import { useBiometrics } from "../hooks";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_KEY } from "../constants";

export default function Main() {
  const { isUnlocked } = useBiometrics();
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);

      if (value !== null) setViewedOnboarding(true);
    } catch (err) {
      console.log("Error @checkOnboarding", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) return <></>;

  return (
    <Redirect
      href={
        viewedOnboarding ? (isLoggedin ? "/main/" : "/auth/") : "/onboarding/"
      }
    />
  );
}
