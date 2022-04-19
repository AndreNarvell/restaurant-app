import "./admin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IGetBooking[]>([]);

  const fetchBooking = async () => {
    const res = await axios.get<IGetBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8"
    );

    setGetBooking(res.data);

    let tempBookings = res.data;

    const newBookings = await Promise.all(
      tempBookings.map(async (obj) => ({
        ...obj,
        name: await fetchCustomer(obj.customerId),
      }))
    );

    console.log(newBookings);
  };

  const deleteBooking = async (bookingId: string) => {
    let res = await axios.delete<IGetBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/delete/${bookingId}`
    );
    console.log("Successfully deleted: ", res);
    fetchBooking();
  };

  const fetchCustomer = async (customerId: string) => {
    let res = await axios.get<ICustomer[]>(
      `https://school-restaurant-api.azurewebsites.net/customer/${customerId}`
    );

    return res.data[0].name;
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  let bookings = getBooking.map((booking: IGetBooking) => {
    return (
      <div className="bookingCard" key={booking._id}>
        <div className="bookingCardInfo" key={booking.customerId}>
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

  return <div className="cardContainer">{bookings}</div>;
};

export default Admin;
