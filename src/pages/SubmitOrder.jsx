import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";

import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartDiscount,
  getTotalCartPrice,
} from "../features/Ordering/orderSlice";
import { styled } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createOrder } from "../services/apiOrders";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hashids from "hashids";

//1. useCreateform is to be created

const Span = styled.span`
  display: flex;
  justify-content: end;
  gap: 2rem;
`;

const H1 = styled.h1`
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
`;

const H3 = styled.h3`
  display: flex;
  justify-content: end;
  color: var(--color-brand-600);
  &:hover {
    cursor: pointer;
    color: var(--color-red-800);
  }
`;

function SubmitOrder() {
  const [orderId, setOrderId] = useState(0);
  const { register, handleSubmit, formState } = useForm();

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalDiscount = useSelector(getTotalCartDiscount);
  const priceAfterDiscount = totalPrice - totalDiscount;

  const { submitOrder, isCreating } = useCreateOrder();
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  const { errors } = formState;

  //call usecreate here
  function useCreateOrder() {
    const queryClient = useQueryClient();

    const { mutate: submitOrder, isLoading: isCreating } = useMutation({
      mutationFn: createOrder,
      onSuccess: (data) => {
        toast.success("سفارش شما با موفقیت ثبت شد");
        queryClient.invalidateQueries({ queryKey: "orders" });
        setOrderId(data.at(0).id);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return { submitOrder, isCreating };
  }

  const hashids = new Hashids();

  const hashed = hashids.encode(orderId + 2000);

  function onSubmit(data) {
    submitOrder(
      {
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        orderedProducts: JSON.stringify(cart),
        totalPrice: priceAfterDiscount,
      },
      {
        onSuccess: () => {
          dispatch(clearCart());
        },
      }
    );
  }

  if (orderId)
    return (
      <div>
        <H1>{hashed} :شماره سفارش شما</H1>
        <H3>
          <Link to="/order/search">پیگیری سفارش</Link>
        </H3>
      </div>
    );
  else if (!cart.length) return <H1>سبد خرید خالی است</H1>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام و نام‌خانوادگی" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="customerName"
          {...register("customerName", {
            required: "لطفا نام و نام‌خانوادگی خود را وارد کنید",
          })}
        />
      </FormRow>

      <FormRow label="شماره همراه" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "لطفا شماره همراه خود را وارد کنید",
          })}
        />
      </FormRow>

      <FormRow>
        <Span>
          <span>{formatPrice(priceAfterDiscount)}</span>
          <span>:</span>
          <span>قیمت نهایی</span>
        </Span>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>ثبت سفارش</Button>
      </FormRow>
    </Form>
  );
}

export default SubmitOrder;
