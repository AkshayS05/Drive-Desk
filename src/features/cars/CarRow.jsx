import ConfirmDelete from "../../ui/ConfirmDelete";

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCarForm from "./CreateCarForm";
import { useDeleteCar } from "./useDeleteCar";
import { useCreateCar } from "./useCreateCar";
import {
  HiPencil,
  HiPencilSquare,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  aspect-ratio: 2 / 2;
`;
const Car = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const Price = styled.div`
  font-weight: 600;
  font-family: "Sono";
`;
const Discount = styled.div`
  font-weight: 500;
  font-family: "Sono";
  color: var(--color-green-700);
`;

const CarRow = ({ car }) => {
  const { isDeleting, deleteCar } = useDeleteCar();

  const { isCreating, createCar } = useCreateCar();

  const {
    id: carID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = car;

  function handleDuplicate() {
    createCar({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Car>{name}</Car>
      <div>Fits up to {maxCapacity} people</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={carID} />
            <Menus.List id={carID}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>
              {/* Edit Modal */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {/* Delete Modal */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateCarForm carToEdit={car} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="car"
              disabled={isDeleting}
              onConfirm={() => deleteCar(carID)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CarRow;
