import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "returned",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully returned`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while checkin out"),
  });
  return { checkout, isCheckinOut };
}
