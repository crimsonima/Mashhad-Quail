import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import {
  clearCart,
  getCart,
  getTotalCartDiscount,
  getTotalCartPrice,
} from "../features/Ordering/orderSlice";
import CartItem from "../features/Ordering/CartItem";
import Buttonv1 from "../ui/Buttonv1";
import { Link } from "react-router-dom";

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

const Span = styled.span`
  display: flex;
  gap: 2rem;
`;

const H1 = styled.h1`
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
`;

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalDiscount = useSelector(getTotalCartDiscount);

  const priceAfterDiscount = totalPrice - totalDiscount;

  const formatPrice = (price) => {
    return price.toLocaleString("fa", {
      style: "currency",
      currency: "IRR",
    });
  };

  if (!cart.length)
    return (
      <StyledDiv>
        <H1>سبد خرید شما خالی است</H1>
      </StyledDiv>
    );

  return (
    <StyledDiv>
      <H1>سبد خرید شما</H1>

      <Ul>
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </Ul>
      <StyledDiv2>
        <div>
          <Span>
            <span>{formatPrice(totalPrice)}</span>
            <span>:</span>
            <span>قیمت کل</span>
          </Span>
          <Span>
            <span>{formatPrice(totalDiscount)}</span>
            <span>:</span>
            <span>سود شما از خرید</span>
          </Span>
        </div>
      </StyledDiv2>
      <StyledDiv3>
        <Span>
          <Link to="/order/new">
            <Buttonv1>ثبت سفارش</Buttonv1>
          </Link>
          <Buttonv1 onClick={() => dispatch(clearCart())}>حذف سبد</Buttonv1>
        </Span>
        <Span>
          <span>{formatPrice(priceAfterDiscount)}</span>
          <span>:</span>
          <span>قیمت نهایی</span>
        </Span>
      </StyledDiv3>
    </StyledDiv>
  );
}

export default Cart;
