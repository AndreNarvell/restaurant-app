import "./booking.scss";
import { Slider } from "@material-ui/core";
import Calendar from "react-calendar";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import "animate.css";
import lovelyPancake from "../../images/lovelyPancake.png";
import { IBooking } from "../../models/IBooking";
import { format } from "date-fns";
import axios from "axios";
import { ICustomer } from "../../models/ICustomer";

const Booking = () => {
  // Seting state for each new section
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [agree, setAgree] = useState(false);

  // Condition for rendering new sections
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  // Seting state for input (ICustomer)
  const [newCustomer, setNewCustomer] = useState<ICustomer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [newBooking, setNewBooking] = useState<IBooking>({
    restaurantId: "624abd70df8a9fb11c3ea8b8",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: newCustomer,
  });

  // Functions
  //Hjälp vad gör e
  const handleAmount = (e: any, amount: any) => {
    if (amount > 0) {
      setAmount(amount);
      setShowDate(true);
      setNewBooking({ ...newBooking, numberOfGuests: amount });
    }
  };

  const handleDate = (date: any) => {
    setDate(date);

    //fattar ingenting vad är det som funkar???
    // setNewBooking({ ...newBooking, date: date.toLocaleDateString() });
    setNewBooking({ ...newBooking, date: format(date, "yyyy-MM-dd") });

    setShowTime(true);
  };

  const handleTime = (e: any) => {
    const value = e.currentTarget.value;
    setTime(value);
    setNewBooking({ ...newBooking, time: value });

    setShowForm(true);
  };

  const handleRegister = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;

    setNewCustomer({ ...newCustomer, [name]: e.target.value });
    // setNewBooking({ ...newBooking, customer: newCustomer });

    console.log(e.target.value);
  };

  useEffect(() => {
    setNewBooking({ ...newBooking, customer: newCustomer });
  }, [newBooking, newCustomer]);

  const postBooking = async () => {
    const response = await axios.post<IBooking>(
      "https://school-restaurant-api.azurewebsites.net/booking/create",
      newBooking
    );
    console.log(response);
  };

  const handleReservation = () => {
    setShowReservation(true);
    console.log(newBooking);
    postBooking();
  };

  const handleCheckbox = () => {
    setAgree(!agree);
  };

  return (
    <div className="bookingContainer">
      <div>
        <div className="bookTable">
          <h1>book a table</h1>
        </div>
      </div>

      {/* Slider */}
      <div className="sliderDiv">
        <h2>
          How many is in your <span className="goldenSpan">party?</span>
        </h2>
        <div style={{ width: 300, margin: 30 }}>
          <Slider min={0} max={6} onChange={handleAmount} value={amount} />
          {amount}
        </div>
      </div>

      {/* Calendar */}
      {showDate && (
        <div className="calendarDiv animate__animated animate__bounceInLeft">
          <h2>
            When would you like to <span className="goldenSpan">party?</span>
          </h2>
          <Calendar
            onChange={handleDate}
            value={date}
            minDate={moment().toDate()}
          />
          <p>{date.toLocaleString().split("T")[0]}</p>
        </div>
      )}

      {/* Choose Time */}
      {showTime && (
        <div className="chooseTimeDiv">
          <h2>
            Available <span className="goldenSpan">party times:</span>
          </h2>
          <button className="primaryBtn" onClick={handleTime} value="18:00">
            <p>18.00</p>
          </button>

          <button className="primaryBtn" onClick={handleTime} value="21:00">
            <p>21.00</p>
          </button>

          <p>{time}</p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="formDiv">
          <form>
            <input
              type="text"
              placeholder="First name.."
              name="name"
              value={newCustomer.name}
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder="Last name.."
              name="lastname"
              value={newCustomer.lastname}
              onChange={handleRegister}
            />
            <input
              type="email"
              placeholder="Email.."
              name="email"
              value={newCustomer.email}
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder="Phone number.."
              name="phone"
              value={newCustomer.phone}
              onChange={handleRegister}
            />
          </form>

          {/* Checkbox */}
          <div className="checkboxDiv">
            <div>
              <input type="checkbox" id="gdpr" onChange={handleCheckbox} />
              <label htmlFor="gdpr">I have agreed to GDPR</label>
            </div>
            <button
              className="primaryBtn"
              onClick={handleReservation}
              disabled={!agree}
            >
              <p>Make reservation</p>
            </button>
          </div>
        </div>
      )}

      {/* Booking Completed */}
      {showReservation && (
        <div className="completeDiv">
          <h2>Booking completed!</h2>
          <img className="lovelyPancake" src={lovelyPancake} alt="" />
        </div>
      )}
    </div>
  );
};

export default Booking;
