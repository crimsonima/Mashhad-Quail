// import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getOrders({ filter, sortBy, page }) {
  let query = supabase.from("orders").select("*", { count: "exact" });

  //Filter

  if (filter) query = query.eq(filter.field, filter.value);

  //Sort

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  //Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  return { data, count };
}

export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        ...newOrder,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("در ثبت سفارش مشکلی پیش آمد");
  }
  return data;
}

export async function searchOrder(id) {
  let { data: order, error } = await supabase
    .from("orders")
    .select("*")

    // Filters
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("در جستوجوی سفارش مشکلی پیش آمد");
  }
  return order;
}

export async function deleteOrder({ orderId: id }) {
  //delete product row

  const { data, error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be deleted");
  }

  return data;
}

export async function updateOrderStatus({ nextStatus, orderId }) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: nextStatus })
    .eq("id", orderId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Status could not be updated");
  }

  return data;
}
