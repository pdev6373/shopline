import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { customAlphabet } from "nanoid";

export default function useEmailVeriication(userId: string) {
  const createVerificationCode = async () => {
    const verificationCode = customAlphabet("1234567890", 6)();

    await AsyncStorage.setItem(
      `verificationCode:${userId}`,
      verificationCode.toString()
    );

    return verificationCode.toString();
  };

  const getVerificationCode = async () => {
    const storedVerificationCode = await AsyncStorage.getItem(
      `verificationCode:${userId}`
    );

    return storedVerificationCode;
  };

  const isCorrectVerificationCode = async (userCode: string) => {
    const storedVerificationCode = await AsyncStorage.getItem(
      `verificationCode:${userId}`
    );

    return storedVerificationCode === userCode;
  };

  const clearVerificationCode = async () =>
    await AsyncStorage.removeItem(`verificationCode:${userId}`);

  return {
    createVerificationCode,
    getVerificationCode,
    isCorrectVerificationCode,
    clearVerificationCode,
  };
}
