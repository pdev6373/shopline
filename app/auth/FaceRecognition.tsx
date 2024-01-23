import {
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../components/general";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../components/auth";
import { useRouter } from "expo-router";
import { FaceVerification } from "../../assets/images/svgs";

export default function FaceRecognition() {
  const router = useRouter();

  const sendNewCodeHandler = async () => {};
  const faceVerificationHandler = async () => router.push("/main/home/");

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
    flexGrow: 1,
  },

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
