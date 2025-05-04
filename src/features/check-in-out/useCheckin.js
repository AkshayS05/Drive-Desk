import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckin } = useMutation({
    mutationFn: ({ bookingId, insurance }) =>
      updateBooking(bookingId, {
        status: "rented",
        isPaid: true,
        ...insurance,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully rented`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checkin"),
  });
  return { checkin, isCheckin };
}
