import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { HiEye } from "react-icons/hi";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import { deleteBooking } from "../../services/apiBookings";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Car = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  text-transform: uppercase;
  font-family: "Sono";
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    isPaid,
    hasInsurance,
    customers,
    cars: { name: carName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    rented: "green",
    returned: "silver",
  };
  const {
    fullName: customerName = "No name available",
    email = "No email available",
  } = customers || {};

  const navigate = useNavigate();
  const { checkout, isCheckinOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Car>{carName}</Car>
      <Stacked>
        <span>{customerName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))}
          &rarr; {numNights} nights
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")}&mdash;
          {format(new Date(endDate), "MM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "rented" && (
              <Menus.Button
                onClick={() => {
                  checkout(bookingId);
                }}
                icon={<HiArrowUpOnSquare />}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
            </Modal.Open>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            resourceName="bookings"
            onConfirm={() => {
              deleteBooking(bookingId);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
export default BookingRow;
