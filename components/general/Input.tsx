import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../../hooks";
import { Dispatch, SetStateAction } from "react";

type InputType = {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

type InputStylesType = {
  backgroundColor: string;
};

export default function Input({
  iconLeft,
  iconRight,
  placeholder,
  value,
  setValue,
}: InputType) {
  const { COLOR } = useTheme();
  const Styles = styles({
    backgroundColor: COLOR.background.secondary,
  });

  const inputChangeHandler = (value: string) => setValue(value);

  return (
    <View style={Styles.wrapper}>
      {iconLeft}
      <TextInput
        value={value}
        onChangeText={inputChangeHandler}
        placeholder={placeholder}
        placeholderTextColor={COLOR.placeholder}
        style={Styles.input}
      />
      {iconRight}
    </View>
  );
}

type OTPInputType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};
export const OTPInput = ({ value, setValue }: OTPInputType) => {
  return (
    <></>
    // <Text>Input</Text>
  );
};

const styles = ({ backgroundColor }: InputStylesType) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor,
      borderRadius: 1000,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
    },

    input: {
      paddingHorizontal: 0,
      paddingVertical: 16,
      flex: 1,
    },
  });
