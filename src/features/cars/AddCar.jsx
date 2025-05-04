import Modal from "../../ui/Modal";
import CreateCarForm from "./CreateCarForm";
import Button from "../../ui/Button";

const AddCar = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="car-form">
          <Button>Add New Car</Button>
        </Modal.Open>
        <Modal.Window name="car-form">
          <CreateCarForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCar;
