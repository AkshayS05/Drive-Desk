import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings = [], isLoading, count } = useBookings();
  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns={"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"}>
        <Table.Header>
          <div>Car</div>
          <div>Customer</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
