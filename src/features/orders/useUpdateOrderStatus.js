import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateOrderStatus } from "../../services/apiOrders";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isLoading: isEditing } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast.success("Status successfully updated");
      queryClient.invalidateQueries({ queryKey: "orders" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateStatus, isEditing };
}
