import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../../hooks";
import { Dispatch, SetStateAction, useRef } from "react";
import Text from "./Text";
import { ErrorType } from "../../types";
import OTPTextInput from "react-native-otp-textinput";

type InputType = {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  placeholder: string;
  value: string;
  setValue: (text: string) => any;
  errorMessage?: string;
  setError?: Dispatch<SetStateAction<ErrorType>>;
};

type InputStylesType = {
  backgroundColor: string;
  errorColor: string;
  inputColor: string;
  hasError?: boolean;
};

export default function Input({
  iconLeft,
  iconRight,
  placeholder,
  value,
  setValue,
  errorMessage,
  setError,
}: InputType) {
  const { COLOR } = useTheme();
  const Styles = styles({
    backgroundColor: COLOR.background.secondary,
    errorColor: COLOR.error,
    inputColor: COLOR.text.main,
    hasError: !!errorMessage,
  });

  return (
    <View style={Styles.wrapper}>
      <View style={Styles.inputWrapper}>
        {iconLeft}
        <TextInput
          value={value}
          onChangeText={(text) => {
            setError &&
              setError({
                field: "",
                message: "",
              });
            setValue(text);
          }}
          placeholder={placeholder}
          placeholderTextColor={COLOR.placeholder}
          style={Styles.input}
        />
        {iconRight}
      </View>

      {errorMessage ? (
        <Text
          color={COLOR.error}
          size={12}
          type="body"
          weight="400"
          letterSpacing={0.2}
        >
          {errorMessage}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
}

type OTPInputType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};
export const OTPInput = ({ value, setValue }: OTPInputType) => {
  let otpInput = useRef<any>();

  // const setText = () => {
  //   otpInput?.current?.setValue("1234");
  // };

  return (
    <OTPTextInput
      inputCount={6}
      autoFocus
      offTintColor={"transparent"}
      tintColor={"#FF9F29"}
      textInputStyle={otpStyles.textInput}
      containerStyle={otpStyles.container}
    />
  );
};

const otpStyles = StyleSheet.create({
  container: {
    gap: 11.75,
  },

  textInput: {
    borderRadius: 1000,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#1B2537",
    color: "#F8FAFC",
    fontSize: 24,
    lineHeight: 31,
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Bold",
    margin: 0,
    padding: 14,
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const styles = ({
  backgroundColor,
  hasError,
  errorColor,
  inputColor,
}: InputStylesType) =>
  StyleSheet.create({
    wrapper: {
      gap: 12,
    },

    inputWrapper: {
      backgroundColor,
      borderRadius: 1000,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderWidth: 1,
      borderColor: hasError ? errorColor : backgroundColor,
    },

    input: {
      paddingHorizontal: 0,
      paddingVertical: 15,
      flex: 1,
      color: inputColor,
    },
  });
