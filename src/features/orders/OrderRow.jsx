import styled from "styled-components";
import Hashids from "hashids";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import Modal from "../../ui/Modal";
import OrderingSearchTable from "../Ordering/OrderingSearchTable";
import Buttonv1 from "../../ui/Buttonv1";
import { useState } from "react";
import { HiCheckCircle, HiTrash } from "react-icons/hi2";
import { useDeleteOrder } from "./useDeleteOrder";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";

const RotatedBotton = styled.button`
  rotate: 180deg;
`;

const Span = styled.span`
  display: flex;
  gap: 1rem;
  justify-content: start;
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  order: {
    id: orderId,
    created_at,
    customerName,
    orderedProducts,
    totalPrice,
    status,
  },
}) {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [updateCheck, setUpdateCheck] = useState(false);

  const statusToTagName = {
    "تایید-نشده": "red",
    "آماده-شده": "blue",
    "تایید-شده": "green",
    "تحویل-شده": "silver",
  };

  const hashids = new Hashids();

  const { isDeleting, deleteOrder } = useDeleteOrder();
  const { updateStatus, isEditing } = useUpdateOrderStatus();

  const handleUpdate = () => {
    let nextStatus = "";
    if (status === "تایید-نشده") nextStatus = "تایید-شده";
    else if (status === "تایید-شده") nextStatus = "آماده-شده";
    else if (status === "آماده-شده") nextStatus = "تحویل-شده";
    setUpdateCheck(false);
    updateStatus({ nextStatus, orderId });
  };

  return (
    <Modal>
      <Table.Row>
        <Span>{hashids.encode(orderId + 2000)}</Span>
        <Span>{customerName}</Span>
        <Span>{created_at.replace(/\..*/, "").replace("T", " ")}</Span>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Span>
          {!updateCheck ? (
            <button
              disabled={isEditing || status === "تحویل-شده"}
              onClick={() => setUpdateCheck(true)}
            >
              <HiCheckCircle />
            </button>
          ) : (
            <button disabled={isEditing} onClick={handleUpdate}>
              <RotatedBotton>
                <HiCheckCircle />
              </RotatedBotton>
            </button>
          )}
        </Span>

        <Span>
          <Modal.Open opens="products">
            <Buttonv1>Products</Buttonv1>
          </Modal.Open>
        </Span>
        <Modal.Window name="products">
          <OrderingSearchTable
            products={JSON.parse(orderedProducts)}
            totalPrice={totalPrice}
          />
        </Modal.Window>
        {!deleteCheck ? (
          <button onClick={() => setDeleteCheck(true)}>
            <HiTrash />
          </button>
        ) : (
          <RotatedBotton
            onClick={() => deleteOrder({ orderId })}
            disabled={isDeleting}
          >
            <HiTrash />
          </RotatedBotton>
        )}
      </Table.Row>
    </Modal>
  );
}

export default BookingRow;
