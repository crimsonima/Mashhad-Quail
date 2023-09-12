import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ProductsTableOps from "../features/products/ProductsTableOps";
import OrderingProductTable from "../features/Ordering/OrderingProductTable";
import Buttonv1 from "../ui/Buttonv1";
import { useSelector } from "react-redux";
import { getCart } from "../features/Ordering/orderSlice";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 4rem;
`;

function Ordering() {
  const cart = useSelector(getCart);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">همه محصولات</Heading>
        <ProductsTableOps />
      </Row>

      <Row>
        <OrderingProductTable />
      </Row>

      {!cart.length ? (
        ""
      ) : (
        <StyledDiv>
          <Link to="/cart">
            <Buttonv1>تکمیل خرید</Buttonv1>
          </Link>
        </StyledDiv>
      )}
    </>
  );
}

export default Ordering;
