import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function ProductTable() {
  const { isLoading, products } = useProducts();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredProducts;
  if (filterValue === "all") filteredProducts = products;
  if (filterValue === "no-discount")
    filteredProducts = products.filter((product) => product.discount === 0);

  if (filterValue === "with-discount")
    filteredProducts = products.filter((product) => product.discount > 0);

  // sort

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (!products.length) return <Empty resource="products" />;

  return (
    <Menus>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Product</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {sortedProducts.map((product) => (
          <ProductRow product={product} key={product.id} />
        ))}
      </Table>
    </Menus>
  );
}

export default ProductTable;
