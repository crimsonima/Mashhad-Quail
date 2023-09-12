import styled from "styled-components";
import { useState } from "react";
import CreateProductForm from "../products/CreateProductForm";
import { useDeleteProduct } from "../products/useDeleteProduct";
import { HiPlus, HiMinus } from "react-icons/hi2";
import { useCreateProduct } from "../products/useCreateProduct";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "./orderSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
import Buttonv1 from "../../ui/Buttonv1";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Product = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  display: flex;
  justify-content: end;
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  display: flex;
  justify-content: end;
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function OrderingProductRow({ product }) {
  const dispatch = useDispatch();

  const {
    id: productId,
    name,
    regularPrice,
    discount,
    image,
    description,
  } = product;

  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };
  const handleAddToCart = () => {
    const newItem = {
      id: productId,
      name,
      regularPrice,
      discount,
      image,
      quantity: 1,
      totalDiscount: discount * 1,
      totalPrice: regularPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Product>{name}</Product>
      <Price>{formatPrice(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatPrice(discount)}</Discount>
      ) : (
        <Discount>&mdash;</Discount>
      )}
      <>
        {!currentQuantity ? (
          <Buttonv1 onClick={handleAddToCart}>افزودن به سبد</Buttonv1>
        ) : (
          <UpdateItemQuantity id={productId} currentQuntity={currentQuantity} />
        )}
      </>
    </TableRow>
  );
}

export default OrderingProductRow;
