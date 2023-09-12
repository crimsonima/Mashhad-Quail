import OrderRow from "./OrderRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useOrders } from "./useOrders";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function OrderTable() {
  const { orders, isLoading, count } = useOrders();

  if (isLoading) return <Spinner />;

  if (!orders.length) return <Empty resource="orders" />;

  return (
    <>
      <div>Order Table</div>
      <Menus>
        <Table columns="1fr 1fr 1.5fr 0.7fr 0.6fr 1fr 2rem">
          <Table.Header>
            <div>ID</div>
            <div>Customer</div>
            <div>Date</div>
            <div>Status</div>
            <div></div>
            <div>Products</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={orders}
            render={(order) => <OrderRow key={order.id} order={order} />}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default OrderTable;
