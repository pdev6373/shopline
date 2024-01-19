import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";

export default function useEmailVeriication(userId: string) {
  const storeVerificationCode = async () => {
    const verificationCode = nanoid(6);

    await AsyncStorage.setItem(
      `verificationCode:${userId}`,
      verificationCode.toString()
    );
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
    storeVerificationCode,
    getVerificationCode,
    isCorrectVerificationCode,
    clearVerificationCode,
  };
}
