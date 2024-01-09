import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../../hooks";

type InputType = {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  placeholder: string;
  value: string;
  onChangeText: any;
};

type InputStylesType = {
  backgroundColor: string;
};

export default function Input({
  iconLeft,
  iconRight,
  placeholder,
  value,
  onChangeText,
}: InputType) {
  const { COLOR } = useTheme();
  const Styles = styles({
    backgroundColor: COLOR.background.secondary,
  });

  return (
    <View style={Styles.wrapper}>
      {iconLeft}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLOR.placeholder}
        style={Styles.input}
      />
      {iconRight}
    </View>
  );
}

const styles = ({ backgroundColor }: InputStylesType) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor,
      borderRadius: 1000,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
    },

    input: {
      paddingVertical: 16,
    },
  });
