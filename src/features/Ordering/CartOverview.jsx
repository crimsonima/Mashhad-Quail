import { HiShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity } from "./orderSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  if (!totalCartQuantity) return null;

  return (
    <div>
      <Link to="/cart">
        <HiShoppingCart />
      </Link>
      <span> {totalCartQuantity}</span>
    </div>
  );
}

export default CartOverview;
