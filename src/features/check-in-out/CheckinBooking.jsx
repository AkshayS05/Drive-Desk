import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import { useEffect, useState } from "react";
import CheckBox from "../../ui/CheckBox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addInsurance, setAddInsurance] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    customers,
    totalPrice,
    numGuests,
    hasInsurance,
    numNights,
  } = booking;

  const optionalInsurancePrice = settings.insurancePrice * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    const checkinPayload = {
      bookingId,
      insurance: addInsurance
        ? {
            hasInsurance: true,
            extrasPrice: optionalInsurancePrice,
            totalPrice: totalPrice + optionalInsurancePrice,
          }
        : undefined,
    };

    checkin(checkinPayload);
  }

  return (
    <>
      <Row>
        <Heading>Checkin Booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      {/* booking data box here... */}
      <BookingDataBox booking={booking} />
      {!hasInsurance && (
        <Box>
          <CheckBox
            checked={addInsurance}
            onChange={() => {
              setAddInsurance((add) => !add);
              setConfirmPaid(false);
            }}
            id="confirm"
          >
            `Want to add insurance for ${formatCurrency(optionalInsurancePrice)}
            ?`
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckin}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {customers.fullName}has paid the total amount of
          {!addInsurance
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalInsurancePrice
              )}(${formatCurrency(totalPrice)}+${formatCurrency(
                optionalInsurancePrice
              )})`}
        </CheckBox>
      </Box>
      <Box>
        <ButtonGroup>
          <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckin}>
            Check in Booking #{bookingId}
          </Button>
          <Button variation="secondary">Back</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default CheckinBooking;
