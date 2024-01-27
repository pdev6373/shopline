import {
  MainButton,
  MainHeading,
  MainTextLight,
} from "../../../components/general";
import { StyleSheet, View } from "react-native";
import { Header } from "../../../components/auth";
import { useRouter } from "expo-router";
import { Fingerprint } from "../../../assets/images/svgs";
import { useBiometrics } from "../../../hooks";

export default function EnableFingerprint() {
  const router = useRouter();
  const { unlockAppHandler } = useBiometrics();

  const enaleFingerprintHandler = async () => {
    const response = await unlockAppHandler();
    if (response) router.push("/main/_layout");
    else console.log("error");
  };
  const skipFingerprintHandler = async () => router.push("/main/_layout");

  return (
    <>
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
            <MainButton onPress={enaleFingerprintHandler}>
              Enable Fingerprint
            </MainButton>
            <MainButton onPress={skipFingerprintHandler} transparent>
              I’ll do this later
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
