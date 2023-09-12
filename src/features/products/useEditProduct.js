import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import { toast } from "react-hot-toast";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      toast.success("Product successfully updated");
      queryClient.invalidateQueries({ queryKey: "products" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editProduct, isEditing };
}
