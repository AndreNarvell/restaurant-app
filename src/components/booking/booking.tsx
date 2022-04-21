import { Slider } from "@material-ui/core";
import { ICustomer } from "../../models/ICustomer";
import { IGetBooking } from "../../models/IGetBooking";
import { IBooking } from "../../models/IBooking";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";

import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";

import "./booking.scss";
import "animate.css";

import lovelyPancake from "../../images/lovelyPancake.png";
import Spacer from "../../styles/Spacer";

const Booking = () => {
  //Fetch booking from API
  const fetchBooking = async () => {
    const { data: fetchedBookings } = await axios.get<IGetBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624abd70df8a9fb11c3ea8b8"
    );
    setBookings(fetchedBookings);
  };

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

  const [showEarly, setShowEarly] = useState(true);
  const [showLate, setShowLate] = useState(true);

  // State for input (ICustomer)
  const [newCustomer, setNewCustomer] = useState<ICustomer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  //State for booking
  const [newBooking, setNewBooking] = useState<IBooking>({
    restaurantId: "624abd70df8a9fb11c3ea8b8",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: newCustomer,
  });

  const [bookings, setBookings] = useState<IGetBooking[]>([]);

  // Functions
  const handleAmount = (amount: number) => {
    if (amount > 0) {
      setAmount(amount);
      setShowDate(true);
      setNewBooking({ ...newBooking, numberOfGuests: amount });
    }
  };

  //Checking availability to API
  const checkAvailability = (tempDate: Date) => {
    const tDate = format(tempDate, "yyyy-MM-dd");
    const earlyBookings = bookings.filter(function (el) {
      return el.date === tDate && el.time === "18:00";
    });

    const lateBookings = bookings.filter(function (el) {
      return el.date === tDate && el.time === "21:00";
    });

    if (earlyBookings.length >= 8) {
      setShowEarly(false);
    } else {
      setShowEarly(true);
    }

    if (lateBookings.length >= 5) {
      setShowLate(false);
    } else {
      setShowLate(true);
    }
  };

  //Conditional rendering and setting state
  const handleDate = (date: Date) => {
    const tempDate = date;
    setDate(date);
    setNewBooking({ ...newBooking, date: format(date, "yyyy-MM-dd") });
    setShowTime(true);
    checkAvailability(tempDate);
  };

  //Conditional rendering and setting state
  const handleTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setTime(value);
    setNewBooking({ ...newBooking, time: value });
    setShowForm(true);
  };

  //Conditional rendering and setting state
  const handleRegister = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    setNewCustomer({ ...newCustomer, [name]: e.target.value });
  };

  //Fetch booking each time you either update the page or load
  useEffect(() => {
    fetchBooking();
  }, []);

  //Autoscroll
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [showDate, showTime, showForm, showReservation]);

  //Each time newBooking or newCustomer changes, set newBooking
  useEffect(() => {
    setNewBooking({ ...newBooking, customer: newCustomer });
  }, [newBooking, newCustomer]);

  //Post booking to API
  const postBooking = async () => {
    await axios.post<IBooking>(
      "https://school-restaurant-api.azurewebsites.net/booking/create",
      newBooking
    );
  };

  //Conditional rendering and setting state
  const handleReservation = () => {
    setShowReservation(true);
    postBooking();
  };

  //Setting state
  const handleCheckbox = () => {
    setAgree(!agree);
  };

  //HTML return
  return (
    <>
      <div className="bookingContainer">
        {/* Slider */}
        <div className="sliderDiv">
          <h2>
            How many is in your <span className="goldenSpan">party?</span>
          </h2>
          <div style={{ width: 300, margin: 30 }}>
            <Slider
              min={0}
              max={6}
              onChange={(e, number) => handleAmount(number as number)}
              value={amount}
              id="scroll-to-bottom"
            />
            {amount}
          </div>
        </div>

        <Spacer height={50} />

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
          </div>
        )}

        <Spacer height={50} />

        {/* Choose Time */}
        {showTime && (
          <div className="calendarDiv animate__animated animate__bounceInLeft">
            <div className="chooseTimeDiv">
              <h2>
                Available <span className="goldenSpan">party times:</span>
              </h2>

              <div className="timeBtnDiv">
                {showEarly && (
                  <button
                    className="primaryBtn"
                    onClick={handleTime}
                    value="18:00"
                  >
                    <p>18.00</p>
                  </button>
                )}

                {showLate && (
                  <button
                    className="primaryBtn"
                    onClick={handleTime}
                    value="21:00"
                  >
                    <p>21.00</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <Spacer height={50} />

        {/* Form */}
        {showForm && (
          <div className="calendarDiv animate__animated animate__bounceInLeft">
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
                <div className="primaryBtnContainer">
                  <button
                    className="primaryBtn"
                    onClick={handleReservation}
                    disabled={!agree}
                  >
                    <p>Make reservation</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Completed */}
        {showReservation && (
          <div className="calendarDiv animate__animated animate__bounceInLeft">
            <div className="completeDiv">
              <h2>Booking completed!</h2>
              <img
                className="lovelyPancake"
                src={lovelyPancake}
                alt="a lovely pancake"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
