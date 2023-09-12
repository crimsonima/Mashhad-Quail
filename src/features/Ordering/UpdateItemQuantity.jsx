import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { decreaseItemQuantity, increaseItemQuantity } from "./orderSlice";
import { HiMinus, HiPlus } from "react-icons/hi2";
import Buttonv1 from "../../ui/Buttonv1";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Span = styled.span`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
`;

function UpdateItemQuantity({ id, currentQuntity, add = null, reduce = null }) {
  const dispatch = useDispatch();

  return (
    <Buttons>
      <Buttonv1
        onClick={() => {
          dispatch(decreaseItemQuantity(id));
          {
            reduce ? reduce() : "";
          }
        }}
      >
        <HiMinus />
      </Buttonv1>
      <span>{currentQuntity}</span>
      <Buttonv1
        onClick={() => {
          dispatch(increaseItemQuantity(id));
          {
            add ? add() : "";
          }
        }}
      >
        <HiPlus />
      </Buttonv1>
    </Buttons>
  );
}

export default UpdateItemQuantity;
