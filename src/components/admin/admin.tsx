import "./admin.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";

const Admin = () => {
  const [getBooking, setGetBooking] = useState<IGetBooking[]>([]);
  const [getCustomer, setGetCustomer] = useState<ICustomer[]>([]);
  const [test, setTest] = useState([]);

  // const [customerName, setCustomerName] = useState("");
  // const [newCustomer, setNewCustomer] = useState<ICustomer>({
  //   name: "",
  //   lastname: "",
  //   email: "",
  //   phone: "",
  // });

  //Lägg till i en service komponent? hjälp
  const fetchBooking = async () => {
    const res = await axios.get<IGetBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8"
    );

    setGetBooking(res.data);

    let tempBookings = res.data

    // Psuedo kod
    // 1. skapa en ny temporär array
    // 2. for-loop obj in tempBookings => gör fetchCustomer hämta namn, telefonnummer etc i temporära variabler
    //      3. destructrure obj och lägg till de nya värdena typ ...obj, name: tempname, phone: tempphone
    //      4. appenda nya obj på din temporära array
    // 5. utanför for-loop sätt din nya array med alla tillagda värden till din hook av bookings 

    const newBookings = await Promise.all(

      tempBookings.map(async (obj) => ({ ...obj, name: await fetchCustomer(obj.customerId) })));

    console.log(newBookings)

    //setGetBooking(newBookings)

  };

  const deleteBooking = async (bookingId: string) => {
    let res = await axios.delete<IGetBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/delete/${bookingId}`
    );
    console.log('Successfully deleted: ', res);
  }


  const fetchCustomer = async (customerId: string) => {
    let res = await axios.get<ICustomer[]>(
      `https://school-restaurant-api.azurewebsites.net/customer/${customerId}`
    );
    //return res.data[0]
    return res.data[0].name

    // setGetCustomer(res.data)
    // console.log('Fetched customer id:', res.data[0].name, res.data[0].phone);
    // setCustomerName(res.data[0].name);

    // customerName = getCustomer[0].name;
  }


  // console.log(customerName);

  useEffect(() => {
    fetchBooking();
  }, []);

  // let customerList: ICustomer[] = [];

  let bookings = getBooking.map((booking: IGetBooking) => {
    // customerList.push(booking._id);
    // customerList.push(
    //   { ...newCustomer, name: booking._id },
    //   { ...newCustomer, lastname: booking._id },
    //   { ...newCustomer, email: booking._id },
    //   { ...newCustomer, phone: booking._id }
    // );

    return (
      <div className="bookingCard" key={booking._id}>
        <div key={booking.customerId}>
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
          <button onClick={() => { deleteBooking(booking._id) }}>Delete</button>
          <button onClick={() => { fetchCustomer(booking.customerId) }}>Customer</button>
        </div>
      </div>
    );
  });

  // console.log(customerList);
  return (
    <div className="cardContainer">
      {bookings}
    </div>
  );
};

export default Admin;
