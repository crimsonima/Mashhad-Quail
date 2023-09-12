import styled from "styled-components";
import { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateProduct } from "./useCreateProduct";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

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
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const RotatedBotton = styled.button`
  rotate: 90deg;
`;

function ProductRow({ product }) {
  const [deleteCheck, setDeleteCheck] = useState(false);

  const {
    id: productId,
    name,
    regularPrice,
    discount,
    image,
    description,
  } = product;

  const { isCreating, createProduct } = useCreateProduct();

  function handleDuplcate() {
    createProduct({
      name: `Copy of ${name}`,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const { isDeleting, deleteProduct } = useDeleteProduct();

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Product>{name}</Product>
      <Price>{formatPrice(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatPrice(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplcate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateProductForm productToEdit={product} />
          </Modal.Window>
          {!deleteCheck ? (
            <button onClick={() => setDeleteCheck(true)}>
              <HiTrash />
            </button>
          ) : (
            <RotatedBotton
              onClick={() => deleteProduct({ productId, image })}
              disabled={isDeleting}
            >
              <HiTrash />
            </RotatedBotton>
          )}
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={productId} />

          <Menus.List id={productId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplcate}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </TableRow>
  );
}

export default ProductRow;
