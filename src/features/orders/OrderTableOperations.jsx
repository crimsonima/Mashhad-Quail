import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "همه" },
          { value: "تایید-شده", label: "تایید شده" },
          { value: "تایید-نشده", label: "تایید نشده" },
          { value: "آماده-شده", label: "آماده شده" },
          { value: "تحویل-شده", label: "تحویل شده" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
