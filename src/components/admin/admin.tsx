import "./admin.scss";
import axios from "axios";

import { useEffect, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";
import { IBookingWithCustomers } from "../../models/IBookingWithCustomers";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IBookingWithCustomers[]>([]);

  //Fetching bookings together with customer
  const fetchBooking = async () => {
    const { data: bookings } = await axios.get<IGetBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8`
    );

    const customerIds = bookings.map((booking) => booking.customerId);
    const fetchCustomers = customerIds.map((id) =>
      axios.get<ICustomer[]>(
        `https://school-restaurant-api.azurewebsites.net/customer/${id}`
      )
    );

    const customerRes = await Promise.all(fetchCustomers);
    const customers = customerRes.map(({ data }) => data[0]);
    const bookingsWithCustomers: IBookingWithCustomers[] = bookings.map(
      (booking) => {
        const customerId = booking.customerId;
        const customer = customers.find((c) => c._id === customerId);
        return {
          ...booking,
          customer,
        };
      }
    );

    setGetBooking(bookingsWithCustomers);
  };

  //Delete booking
  const deleteBooking = async (bookingId: string) => {
    await axios.delete<IGetBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/delete/${bookingId}`
    );

    fetchBooking();
  };

  //Fetch booking each time you either update the page or load
  useEffect(() => {
    fetchBooking();
  }, []);

  //Mapping out response from fetch to HTML
  let bookings = getBooking.map((booking: IBookingWithCustomers) => {
    return (
      <div className="bookingCard" key={booking._id}>
        <div className="bookingCardInfo" key={booking.customerId}>
          <p>
            <strong>Name: </strong>
            {booking.customer?.name}
          </p>
          <p>
            <strong>Date: </strong>
            {booking.date}
          </p>
          <p>
            <strong>Time: </strong>
            {booking.time}
          </p>
          <p>
            <strong>Guest: </strong>
            {booking.numberOfGuests}
          </p>
          <p>
            <strong>Booking Id: </strong>
            {booking._id}
          </p>
          <button
            className="primaryAdminBtn"
            onClick={() => {
              deleteBooking(booking._id);
            }}
          >
            <p>Delete</p>
          </button>
        </div>
      </div>
    );
  });

  //HTML return
  return <div className="cardContainer">{bookings}</div>;
};

export default Admin;
