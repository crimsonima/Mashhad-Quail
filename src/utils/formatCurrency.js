export function formatCurrency(price) {
  return price.toLocaleString("fa", {
    style: "currency",
    currency: "IRR",
  });
}
