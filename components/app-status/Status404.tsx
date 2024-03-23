import { Status } from "../general";
import { NotAvailable } from "../../assets/images/svgs";

export default function Status404() {
  const goHomeHandler = () => {};

  return (
    <Status
      image={<NotAvailable />}
      heading="Something went wrong"
      body="This page doesn’t exist or was removed! we suggest you back to home."
      buttonText="Go Home"
      onPress={goHomeHandler}
    />
  );
}
