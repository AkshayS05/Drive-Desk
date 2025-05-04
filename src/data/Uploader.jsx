import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cars } from "./data-cars";
import { customers } from "./data-customers";

async function deleteCustomers() {
  const { error } = await supabase.from("customers").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCars() {
  const { error } = await supabase.from("cars").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createCustomers() {
  const { error } = await supabase.from("customers").insert(customers);
  if (error) console.log(error.message);
}

async function createCars() {
  const { error } = await supabase.from("cars").insert(cars);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: customerIds } = await supabase
    .from("customers")
    .select("id")
    .order("id");

  const allCustomerIds = customerIds.map((c) => c.id);

  const { data: carIds } = await supabase.from("cars").select("id").order("id");

  const allCarIds = carIds.map((c) => c.id);

  const finalBookings = bookings
    .map((booking) => {
      const originalCarID = booking.carID;
      const originalCustomerID = booking.customerID;

      const customerID = allCustomerIds[originalCustomerID - 1];
      const carID = allCarIds[originalCarID - 1];

      const car = cars.find((c, index) => index === originalCarID - 1);
      if (!car) {
        console.error(`Car not found for booking with carID ${originalCarID}`);
        return null;
      }

      const numNights = subtractDates(booking.endDate, booking.startDate);
      const carPrice = numNights * (car.regularPrice - car.discount);
      const extrasPrice = booking.hasInsurance
        ? numNights * 15 * booking.numGuests
        : 0;
      const totalPrice = carPrice + extrasPrice;

      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = "checked-in";

      return {
        ...booking,
        numNights,
        carPrice,
        extrasPrice,
        totalPrice,
        customerID,
        carID,
        status,
      };
    })
    .filter(Boolean); // filter out nulls if car was not found

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteCustomers();
    await deleteCars();

    await createCustomers();
    await createCars();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
