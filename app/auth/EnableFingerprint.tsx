import {
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../components/general";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../components/auth";
import { useRouter } from "expo-router";
import { Fingerprint } from "../../assets/images/svgs";

export default function EnableFingerprint() {
  const router = useRouter();

  const sendNewCodeHandler = async () => {};
  const skipFingerprintHandler = async () =>
    router.push("/auth/FaceRecognition");

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      <Header type="arrow" />

      <View style={styles.mainInner}>
        <View style={styles.main}>
          <View style={styles.headingWrapper}>
            <MainHeading center>Enable Fingerprint</MainHeading>
            <View style={styles.headingText}>
              <MainTextLight center>
                Enable your fingerprint authentication as your security.
              </MainTextLight>
            </View>
          </View>

          <Fingerprint width={"100%"} />
        </View>

        <View style={styles.bottom}>
          <View>
            <MainButton onPress={skipFingerprintHandler}>
              Enable Fingerprint
            </MainButton>
            <MainButton onPress={skipFingerprintHandler} transparent>
              I’ll do this later
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
    gap: 20,
    alignItems: "center",
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
