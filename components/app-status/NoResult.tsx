import { Text as RNText, StyleSheet } from "react-native";
import { Status, Text } from "../general";
import { NoResult as NoResultImage } from "../../assets/images/svgs";

export default function NoResult() {
  const tryAnotherKeywordHandler = () => {};

  return (
    <Status
      image={<NoResultImage />}
      heading="No result found"
      body={
        <RNText style={styles.textWrapper}>
          <Text
            color="#64748B"
            size={14}
            type="body"
            weight="400"
            center
            letterSpacing={0.1}
          >
            Could not find results for "
          </Text>

          <Text
            color="#F8FAFC"
            size={14}
            type="body"
            weight="700"
            center
            letterSpacing={0.1}
          >
            {`Fcfcfc`}
          </Text>

          <Text
            color="#64748B"
            size={14}
            type="body"
            weight="400"
            center
            letterSpacing={0.1}
          >
            ". Please try a different or more general keyword.
          </Text>
        </RNText>
      }
      buttonText="Try Another keyword"
      onPress={tryAnotherKeywordHandler}
    />
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    textAlign: "center",
  },
});
