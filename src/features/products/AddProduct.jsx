import Button from "../../ui/Button";
import CreateProductForm from "./CreateProductForm";
import Modal from "../../ui/Modal";

function AddProduct() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>Add new product</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProduct;
