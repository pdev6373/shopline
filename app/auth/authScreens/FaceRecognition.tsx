import {
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../../components/general";
import { StyleSheet, View } from "react-native";
import { Header } from "../../../components/auth";
import { useRouter } from "expo-router";
import { FaceVerification } from "../../../assets/images/svgs";
import { useBiometrics } from "../../../hooks";

export default function FaceRecognition() {
  const router = useRouter();
  const { unlockAppHandler } = useBiometrics();

  const faceVerificationHandler = async () => {
    const response = await unlockAppHandler();
    if (response) router.push("/main/_layout");
    else console.log("error");
  };

  return (
    <>
      <Header type="arrow" />

      <View style={styles.mainInner}>
        <View style={styles.main}>
          <FaceVerification width={120} height={120} />

          <View style={styles.headingWrapper}>
            <MainHeading center>Face Recognition</MainHeading>
            <View style={styles.headingText}>
              <MainTextLight center>
                For security reasons, we need to verify your personal data
              </MainTextLight>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <View>
            <MainButton onPress={faceVerificationHandler}>
              Face Verification
            </MainButton>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingWrapper: {
    gap: 8,
  },

  main: {
    flex: 1,
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  mainInner: {
    flex: 1,
    gap: 20,
  },

  headingText: {
    maxWidth: 210,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
