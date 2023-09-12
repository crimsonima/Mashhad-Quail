import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrders";
import { toast } from "react-hot-toast";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      toast.success("Product successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteOrder };
}
