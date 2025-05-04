import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckout";

const CheckoutButton = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => CheckoutButton(bookingId)}
      disabled={isCheckingOut}
    >
      Check Out
    </Button>
  );
};

export default CheckoutButton;
