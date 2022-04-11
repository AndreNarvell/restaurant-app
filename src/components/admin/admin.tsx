import axios from "axios";
import { useEffect, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IGetBooking[]>([]);
  const [getCustomer, setGetCustomer] = useState<ICustomer[]>([]);

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
      <tr key={booking.id}>
        <td>{i + 1}</td>
        <td>Anna</td>
        <td>{booking.numberOfGuests}</td>
        <td>{booking.date}</td>
        <td>{booking.time}</td>
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
      </tr>
    );
  });


  return (
    <>
      <table>
        <tr>
          <th>Table nr</th>
          <th>Customer name</th>
          <th>Seats</th>
          <th>Date</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {bookings}
      </table>
    </>
  );
};

export default Admin;
