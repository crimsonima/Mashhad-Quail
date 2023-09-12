import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Ordering/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
