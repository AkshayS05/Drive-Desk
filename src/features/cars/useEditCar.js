import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCar } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useEditCar() {
  const queryClient = useQueryClient();
  const { mutate: editCar, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCarData, id }) => createEditCar(newCarData, id),
    onSuccess: () => {
      toast.success("Car successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCar };
}
