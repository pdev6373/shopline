import { Status } from "../general";
import { TemporaryDown } from "../../assets/images/svgs";

export default function Status500() {
  const notifyMeHandler = () => {};

  return (
    <Status
      image={<TemporaryDown />}
      heading="We’re temporary down"
      body="Try again later or turn on notifications, so we could notify you when it’s done."
      buttonText="Notify Me"
      onPress={notifyMeHandler}
      buttonFull
      buttonBottom
    />
  );
}
