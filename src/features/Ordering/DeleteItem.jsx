import { useDispatch } from "react-redux";
import { deleteItem } from "./orderSlice";
import Buttonv1 from "../../ui/Buttonv1";

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return <Buttonv1 onClick={() => dispatch(deleteItem(id))}>حذف</Buttonv1>;
}

export default DeleteItem;
