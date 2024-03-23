import { StyleSheet, View } from "react-native";
import Text from "./Text";
import Button from "./Button";

type StatusType = {
  image: JSX.Element;
  heading: string;
  body: string | JSX.Element;
  buttonText: string;
  onPress: () => any;
  buttonBottom?: boolean;
  buttonFull?: boolean;
};

export default function Status({
  image,
  body,
  heading,
  buttonText,
  onPress,
  buttonBottom = false,
  buttonFull = false,
}: StatusType) {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.topWrapper,
          {
            marginBottom: buttonBottom ? "auto" : 0,
            marginTop: buttonBottom ? "auto" : 0,
          },
        ]}
      >
        <View style={styles.imageWrapper}>{image}</View>

        <View style={styles.textWrapper}>
          <Text color="#F8FAFC" size={24} type="heading" weight="700" center>
            {heading}
          </Text>
          {typeof body === "string" ? (
            <Text
              color="#64748B"
              size={14}
              type="body"
              weight="400"
              center
              letterSpacing={0.1}
            >
              {body}
            </Text>
          ) : (
            body
          )}
        </View>
      </View>

      <View
        style={{
          alignItems: buttonFull ? "stretch" : "center",
        }}
      >
        <Button
          onPress={onPress}
          textColor="#0F172A"
          background="#FFFFFF"
          radius={1000}
          textLetterSpacing={0.1}
          textWeight="700"
          textSize={14}
          padding={12}
          paddingHorizontal={16}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingVertical: 8,
    gap: 32,
  },

  topWrapper: {
    gap: 30,
  },

  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  textWrapper: {
    gap: 8,
  },
});
