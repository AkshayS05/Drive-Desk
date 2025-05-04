import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CarRow from "./CarRow";
import { useCars } from "./useCars";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CarTable = () => {
  //from custom hook

  const { isLoading, cars = [] } = useCars();
  const [searchParams] = useSearchParams();
  if (!cars.length) return <Empty resourceName="cars" />;
  if (isLoading) return <Spinner />;

  // 1. filter

  const filteredValue = searchParams.get("discount") || "all";
  let filteredCars;

  if (filteredValue === "all") filteredCars = cars;
  if (filteredValue === "no-discount")
    filteredCars = cars.filter((car) => car.discount === 0);
  if (filteredValue === "with-discount")
    filteredCars = cars.filter((car) => car.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCars = filteredCars.sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Car</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCars}
          render={(car) => <CarRow car={car} key={car.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CarTable;
