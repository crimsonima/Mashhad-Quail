import { styled } from "styled-components";

import OrderItem from "./OrderItem";

const StyledDiv = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;

const StyledDiv2 = styled.div`
  margin-top: 2rem;
  justify-content: end;

  display: flex;
  gap: 1rem;
`;

const StyledDiv3 = styled.div`
  margin-top: 3rem;
  border-top: solid 2px var(--color-red-700);
  display: flex;
  padding-top: 2rem;
  justify-content: space-between;
`;

const Ul = styled.ul`
  margin-top: 0.75rem;
  border-bottom-width: 1px;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  color: var(--color-brand-800);
  gap: 1rem;
  margin-top: 2rem;
  align-items: end;
`;

const H3 = styled.h3`
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
`;

function OrderingSearchTable({ products, totalPrice }) {
  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  return (
    <StyledDiv>
      <H3>اقلام سفارش</H3>
      <StyledDiv2>
        <Ul>
          {products.map((item) => {
            return <OrderItem item={item} key={item.id} />;
          })}
          <Li>
            <span>: قیمت نهایی</span>
            <span>{formatPrice(totalPrice)}</span>
          </Li>
        </Ul>
      </StyledDiv2>
    </StyledDiv>
  );
}

export default OrderingSearchTable;
