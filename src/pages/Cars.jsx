import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CarTable from "../features/cars/CarTable";
import AddCar from "../features/cars/AddCar";
import CarTableOperations from "../features/cars/CarTableOperations";

const Cars = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cars</Heading>

        <CarTableOperations />
      </Row>
      <Row>
        <CarTable />
        <AddCar />
      </Row>
    </>
  );
};

export default Cars;
