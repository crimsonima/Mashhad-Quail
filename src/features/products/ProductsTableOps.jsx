import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ProductsTableOps() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "همه" },
          { value: "no-discount", label: "بدون تخفیف" },
          { value: "with-discount", label: "با تخفیف" },
        ]}
      />

      <SortBy
        options={[
          { value: "regularPrice-asc", label: "کمترین قیمت" },
          { value: "regularPrice-desc", label: "بیشترین قیمت" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductsTableOps;
