import { StyleSheet, TextInput, View, Text as RNText } from "react-native";
import { useTheme } from "../../hooks";
import { Dispatch, SetStateAction, useRef } from "react";
import Text from "./Text";
import { ErrorType } from "../../types";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type InputType = {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  placeholder: string;
  value: string;
  setValue: (text: string) => any;
  errorMessage?: string;
  setError?: Dispatch<SetStateAction<ErrorType>>;
  isTransparent?: boolean;
};

type InputStylesType = {
  backgroundColor: string;
  errorColor: string;
  inputColor: string;
  hasError?: boolean;
  isTransparent: boolean;
};

export default function Input({
  iconLeft,
  iconRight,
  placeholder,
  value,
  setValue,
  errorMessage,
  setError,
  isTransparent = false,
}: InputType) {
  const { COLOR } = useTheme();
  const Styles = styles({
    backgroundColor: COLOR.background.secondary,
    errorColor: COLOR.error,
    inputColor: COLOR.text.main,
    hasError: !!errorMessage,
    isTransparent,
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
          placeholderTextColor={isTransparent ? "#475569" : COLOR.placeholder}
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
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      autoFocus
      onChangeText={(val) => setValue(val.replace(/[^0-9]/g, ""))}
      cellCount={CELL_COUNT}
      rootStyle={otpStyles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <RNText
          key={index}
          style={[otpStyles.cell, isFocused && otpStyles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : "")}
        </RNText>
      )}
    />
  );
};

const otpStyles = StyleSheet.create({
  codeFieldRoot: {
    gap: 11.75,
    justifyContent: "center",
    alignItems: "center",
  },

  cell: {
    fontSize: 24,
    lineHeight: 31,
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Bold",
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#1B2537",
    color: "#F8FAFC",
    margin: 0,
    flex: 1,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  focusCell: {
    borderColor: "#FF9F29",
  },
});

const styles = ({
  backgroundColor,
  hasError,
  errorColor,
  inputColor,
  isTransparent,
}: InputStylesType) =>
  StyleSheet.create({
    wrapper: {
      gap: 12,
    },

    inputWrapper: {
      backgroundColor: isTransparent ? "transparent" : backgroundColor,
      borderRadius: 1000,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderWidth: 1,
      borderColor: hasError
        ? errorColor
        : isTransparent
        ? "#2A3646"
        : backgroundColor,
    },

    input: {
      paddingHorizontal: 0,
      paddingVertical: 10,
      flex: 1,
      color: isTransparent ? "#F8FAFC" : inputColor,
    },
  });
