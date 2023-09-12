import { styled } from "styled-components";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./orderSlice";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLi = styled.li`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: solid 1px #505050;
`;

const StyledPv1 = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: end;
`;
const StyledPv2 = styled.p`
  font-size: 1.2rem;
  line-height: 1.25rem;
  font-weight: 700;
  order: 2;
`;
const Span = styled.span`
  display: flex;
  gap: 5rem;
`;

function CartItem({ item }) {
  const { id, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  return (
    <StyledLi>
      <StyledPv1>
        {quantity}&times; {name}
      </StyledPv1>
      <StyledDiv>
        <StyledPv2>{formatPrice(totalPrice)}</StyledPv2>
        <Span>
          <DeleteItem id={id} />
          <UpdateItemQuantity id={id} currentQuntity={currentQuantity} />
        </Span>
      </StyledDiv>
    </StyledLi>
  );
}

export default CartItem;
