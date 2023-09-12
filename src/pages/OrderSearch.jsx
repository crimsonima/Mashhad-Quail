import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";

import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import { styled } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import OrderingSearchTable from "../features/Ordering/OrderingSearchTable";

import { searchOrder } from "../services/apiOrders";
import { useState } from "react";
import Hashids from "hashids";

const StyledDiv2 = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  gap: 1rem;
`;

function OrderSearch() {
  const [order, setOrder] = useState(null);
  const { register, handleSubmit, formState } = useForm();

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  const { errors } = formState;

  function SearchOrders() {
    const queryClient = useQueryClient();

    const { mutate: search, isLoading: isSearching } = useMutation({
      mutationFn: searchOrder,
      onSuccess: (data) => {
        toast.success("سفارش شما پیدا شد");
        queryClient.invalidateQueries({ queryKey: "orders" });
        setOrder(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return { search, isSearching };
  }

  const { search, isSearching } = SearchOrders();
  const hashids = new Hashids();

  function onSubmit(data) {
    search(hashids.decode(data.id) - 2000);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="شماره پیگیری سفارش" error={errors?.name?.message}>
          <Input
            type="text"
            disabled={isSearching}
            id="id"
            {...register("id", {
              required: "لطفا شماره پیگیری را وارد کنید",
            })}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isSearching}>جست‌وجو</Button>
        </FormRow>
      </Form>
      {order && (
        <StyledDiv2>
          <div>
            <span>وضعیت سفارش</span>
            <span> : </span>
            <span>{order.status}</span>
          </div>

          <OrderingSearchTable
            products={JSON.parse(order.orderedProducts)}
            totalPrice={order.totalPrice}
          />
        </StyledDiv2>
      )}
    </div>
  );
}

export default OrderSearch;
