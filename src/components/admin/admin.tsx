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
      <tr key={booking.id}>
        <td>{i + 1}</td>
        <td>Anna</td>
        <td>{booking.numberOfGuests}</td>
        <td className="dateTd">{booking.date}</td>
        <td>{booking.time}</td>
        <td>
          <button>
            <p>✏️</p>
          </button>
        </td>
        <td>
          <button>
            <p>🗑️</p>
          </button>
        </td>
      </tr>
    );
  });


  return (
    <div className="tableContainer">
      <table>
        <tr>
          <th>Table</th>
          <th>Name</th>
          <th>Seats</th>
          <th>Date</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {bookings}
      </table>
    </div>

  );
};

export default Admin;
