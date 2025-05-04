import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCar } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useCreateCar() {
  const queryClient = useQueryClient();
  const { mutate: createCar, isLoading: isCreating } = useMutation({
    mutationFn: (newCar) => createEditCar(newCar),
    onSuccess: () => {
      toast.success("New car successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCar };
}
