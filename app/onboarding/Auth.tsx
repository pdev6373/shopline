import { View } from "react-native";
const Signup = require("../../assets/images/pngs/signup.png");
import { Image } from "expo-image";
import { MainHeading } from "../../components/general";

export default function Auth() {
  return (
    <View style={{ marginTop: 0 }}>
      <Image
        source={Signup}
        style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
      />
      <View>
        <MainHeading>Shopline</MainHeading>
      </View>
    </View>
  );
}
