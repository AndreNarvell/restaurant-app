import "./booking.scss";
import { Slider } from "@material-ui/core";
import Calendar from "react-calendar";
import React, { ChangeEvent, useState } from "react";
import moment from "moment";
import "animate.css";
import { IClient } from "../../models/IClient";
import lovelyPancake from "../../images/lovelyPancake.png";
import { IBooking } from "../../models/IBooking";

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

  // Seting state for input (IClient)
  const [newClient, setNewClient] = useState<IClient>({
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
    customer: newClient,
  });

  // Functions
  const handleAmount = (e: any, amount: any) => {
    if (amount > 0) {
      setAmount(amount);
      setShowDate(true);
      setNewBooking({ ...newBooking, numberOfGuests: amount });
    }
  };

  const handleDate = (date: any) => {
    setDate(date);
    setNewBooking({ ...newBooking, date: date.toLocaleDateString() });

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

    setNewClient({ ...newClient, [name]: e.target.value });
    setNewBooking({ ...newBooking, customer: newClient });

    console.log(e.target.value);
  };

  const handleReservation = () => {
    setShowReservation(true);
    console.log(newBooking);
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
              value={newClient.name}
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder="Last name.."
              name="lastname"
              value={newClient.lastname}
              onChange={handleRegister}
            />
            <input
              type="email"
              placeholder="Email.."
              name="email"
              value={newClient.email}
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder="Phone number.."
              name="phone"
              value={newClient.phone}
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
