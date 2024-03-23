import { Status } from "../general";
import { NoConnection as NoConnectionImage } from "../../assets/images/svgs";

export default function NoConnection() {
  const tryAgainHandler = () => {};

  return (
    <Status
      image={<NoConnectionImage />}
      heading="No Connection"
      body="No internet connection founds. Check your connection or try again."
      buttonText="Try Again"
      onPress={tryAgainHandler}
    />
  );
}
