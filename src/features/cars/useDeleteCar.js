import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar as deleteCarAPI } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useDeleteCar() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCar } = useMutation({
    mutationFn: (id) => deleteCarAPI(id),
    // invalidate the cache on success
    onSuccess: () => {
      toast.success("Car data successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCar };
}
