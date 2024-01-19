import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Header } from "../../components/auth";
import {
  MainButton,
  MainHeading,
  MainTextLight,
  Text,
} from "../../components/general";
import {
  Check,
  EmailWhite,
  PhoneWhite,
  Uncheck,
} from "../../assets/images/svgs";
import { useTheme } from "../../hooks";
import { useState } from "react";

const FORGOT_PASSWORD_DATA = [
  {
    type: "Email",
    icon: <EmailWhite width={20} height={20} />,
  },
  {
    type: "Phone Number",
    icon: <PhoneWhite width={20} height={20} />,
  },
];

export default function ForgotPassword() {
  const { COLOR } = useTheme();
  const [resetType, setResetType] = useState(FORGOT_PASSWORD_DATA[0].type);

  const resetTypeHandler = () =>
    setResetType((prev) =>
      prev === FORGOT_PASSWORD_DATA[0].type
        ? FORGOT_PASSWORD_DATA[1].type
        : FORGOT_PASSWORD_DATA[0].type
    );

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.mainWrapper}>
        <Header type="arrow" />

        <View style={styles.mainWrapper}>
          <View style={styles.headingWrapper}>
            <MainHeading>Forgot Password</MainHeading>
            <MainTextLight>
              Dont worry! it happens. Please select your email or phone number
              so we can send you a code.
            </MainTextLight>
          </View>

          <View style={styles.main}>
            {FORGOT_PASSWORD_DATA.map((data) => (
              <Pressable
                key={data.type}
                style={[
                  styles.option,
                  resetType === data.type && styles.optionActive,
                ]}
                onPress={resetTypeHandler}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 1000,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        resetType === data.type ? "#FFB254" : "#1B2537",
                    }}
                  >
                    {data.icon}
                  </View>

                  {resetType === data.type ? (
                    <Check width={20} height={20} />
                  ) : (
                    <Uncheck width={20} height={20} />
                  )}
                </View>

                <Text
                  size={16}
                  color={
                    resetType === data.type ? COLOR.white : COLOR.button.main
                  }
                  type="body"
                  weight="700"
                  letterSpacing={0.4}
                >
                  {data.type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View>
        <MainButton href={`/auth/ResetType?type=${resetType}`}>
          Confirm
        </MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
    flexGrow: 1,
    justifyContent: "space-between",
  },

  mainWrapper: {
    gap: 32,
  },

  headingWrapper: {
    gap: 8,
  },

  main: {
    gap: 16,
  },

  option: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A3646",
    overflow: "hidden",
    padding: 20,
    gap: 16,
  },

  optionActive: {
    backgroundColor: "#FF9F29",
    borderColor: "#FF9F29",
  },
});
