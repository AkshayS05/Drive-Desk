import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentRented } from "./useRecentRented";
import Stats from "./Stats";
import { useCars } from "../cars/useCars";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    rented,
    confirmedAndRented,
    isLoadind: isLoading2,
    numDays,
  } = useRecentRented();
  const { cars, isLoading: isLoading3 } = useCars();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedRentals={confirmedAndRented}
        numDays={numDays}
        carCount={cars.length}
      />
      <TodayActivity />
      <DurationChart confirmedRented={confirmedAndRented} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
