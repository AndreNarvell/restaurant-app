import "./admin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
// import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IGetBooking[]>([]);
  // const [getCustomer, setGetCustomer] = useState<ICustomer[]>([]);

  //Lägg till i en service komponent? hjälp
  const fetchBooking = async () => {
    const response = await axios.get<IGetBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8"
    );

    setGetBooking(response.data)
    console.log(response.data);
  };

  //   "https://school-restaurant-api.azurewebsites.net/booking/delete/625300b3dc2b88e11b1f8204"
  //"https://school-restaurant-api.azurewebsites.net/customer/"

  useEffect(() => {
    fetchBooking();
  }, []);

  //Unique key prop? hjälppp!!
  let bookings = getBooking.map((booking: IGetBooking, i: number) => {
    return (
      <div className="bookingCard" key={booking._id}>
        <h2>Table: {i + 1}</h2>
        <p><strong>Date & Time: </strong>{booking.date}, {booking.time}</p>
        <p><strong>Guest: </strong>{booking.numberOfGuests}</p>
        <p><strong>Booking Id: </strong>{booking._id}</p>
      </div>
    );
  });

  return (
    <div className="cardContainer">
        {bookings}
    </div>
  );
};

export default Admin;
