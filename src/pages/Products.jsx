import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ProductTable from "../features/products/ProductTable";
import AddProduct from "../features/products/AddProduct";
import ProductsTableOps from "../features/products/ProductsTableOps";

function Products() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Products</Heading>
        <ProductsTableOps />
      </Row>

      <Row>
        <ProductTable />

        <AddProduct />
      </Row>
    </>
  );
}

export default Products;
