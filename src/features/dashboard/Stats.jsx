import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedRentals, numDays, carCount }) {
  // 1.
  const numBookings = bookings?.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.
  const pickups = confirmedRentals?.length;
  // 4.
  // num of pickup nights/ all available nights(num days *num cars)
  const occupation =
    confirmedRentals.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * carCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Pick ups"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={pickups}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
