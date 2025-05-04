import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentRented() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryData = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: rented = [] } = useQuery({
    queryFn: () => getStaysAfterDate(queryData),
    queryKey: ["rented", `last-${numDays}`],
  });
  const confirmedAndRented = rented?.filter(
    (rentedCar) =>
      rentedCar.status === "checked-in" || rentedCar.status === "checked-out"
  );

  return { isLoading, rented, confirmedAndRented, numDays };
}
