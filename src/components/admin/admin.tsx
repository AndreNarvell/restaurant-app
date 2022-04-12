import "./admin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IGetBooking[]>([]);
  const [getCustomer, setGetCustomer] = useState<ICustomer[]>([]);
  // const [customerName, setCustomerName] = useState("");

  //Lägg till i en service komponent? hjälp
  const fetchBooking = async () => {
    const response = await axios.get<IGetBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8"
    );

    setGetBooking(response.data);
    // console.log(response.data[1]._id);
    let customerIdFromFetch = response.data[1]._id;

    const responseTwo = await axios.get<ICustomer[]>(
      "https://school-restaurant-api.azurewebsites.net/customer/" +
        customerIdFromFetch
    );

    console.log(responseTwo.data[1].name);
  };

  // const fetchCustomer = async (id: any) => {
  // const response = await axios.get<ICustomer[]>(
  //   "https://school-restaurant-api.azurewebsites.net/customer/" + id
  // );

  //   setGetCustomer(response.data);
  //   console.log(response.data);
  //   console.log("heeej", id);

  //   // setCustomerName(response.data[0].name);
  // };

  //   "https://school-restaurant-api.azurewebsites.net/booking/delete/625300b3dc2b88e11b1f8204"
  //"https://school-restaurant-api.azurewebsites.net/customer/"

  useEffect(() => {
    fetchBooking();
    // fetchCustomer()
  }, []);

  let customer = getCustomer.map((customer: ICustomer) => {
    return (
      <div>
        <p> {customer.name} </p>
      </div>
    );
  });

  //Unique key prop? hjälppp!!
  let bookings = getBooking.map((booking: IGetBooking) => {
    return (
      <div className="bookingCard" key={booking._id}>
        <p>
          <strong>Date & Time: </strong>
          {booking.date}, {booking.time}
        </p>
        <p>
          <strong>Guest: </strong>
          {booking.numberOfGuests}
        </p>
        <p>
          <strong>Booking Id: </strong>
          {booking._id}
        </p>
      </div>
    );
  });

  return (
    <div className="cardContainer">
      {/* <button onClick={fetchCustomer}>test</button> */}
      {customer}
      {bookings}
    </div>
  );
};

export default Admin;
