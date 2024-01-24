import {
  MainButton,
  MainHeading,
  MainTextLight,
  Text,
} from "../../components/general";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../components/auth";
import { useRouter } from "expo-router";
import { PasswordUpdateSuccess } from "../../assets/images/svgs";

export default function PasswordUpdated() {
  const router = useRouter();

  const backToSigninHandler = () => router.push("/auth?type=signin");

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      <Header type="cancel" />

      <View style={styles.mainInner}>
        <View style={styles.main}>
          <PasswordUpdateSuccess width={120} height={120} />

          <View style={styles.headingWrapper}>
            <MainHeading center>Password Updated!</MainHeading>
            <View style={styles.headingText}>
              <MainTextLight center>
                Your password has been set up successfully.
              </MainTextLight>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.bottomTexts}>
            <Text
              color="#F8FAFC"
              size={14}
              type="body"
              weight="500"
              letterSpacing={0.1}
            >
              {`Redirecting sign in page in `}
            </Text>
            <Text
              color="#FF9F29"
              size={14}
              type="body"
              weight="700"
              letterSpacing={0.1}
            >
              {`4 `}
            </Text>
            <Text
              color="#F8FAFC"
              size={14}
              type="body"
              weight="500"
              letterSpacing={0.1}
            >
              sec
            </Text>
          </View>
          <View>
            <MainButton onPress={backToSigninHandler}>
              Back to Sign In
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
    gap: 24,
  },

  bottomTexts: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
