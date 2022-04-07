import "./booking.scss";
import { Slider } from "@material-ui/core";
import Calendar from "react-calendar";
import { useState } from "react";
import moment from "moment";

const Booking = () => {
  const [amount, setAmount] = useState([1]);
  const [date, setDate] = useState(new Date());
  // const [date, setDate] = useState(moment().format('MM/DD/YYYY'));

  //https://mui.com/components/slider/
  const updateAmount = (e: any, amount: any) => {
    setAmount(amount);
    console.log(amount);
  };

  const handleDate = (date: any) => {
    setDate(date);
    console.log(date);
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
          How many is in your <span className="golden-span">party?</span>
        </h2>
        <div style={{ width: 300, margin: 30 }}>
          <Slider min={1} max={6} onChange={updateAmount} value={amount} />
          {amount}
        </div>
      </div>

      {/* Calendar */}
      <div className="calendarDiv">
        <h2>
          When would you like to <span className="golden-span">party?</span>
        </h2>
        <Calendar
          onChange={handleDate}
          value={date}
          minDate={moment().toDate()}
        />
        <p>{date.toISOString().split("T")[0]}</p>
      </div>

      <div className="chooseTimeDiv">
        <h2>
          Available <span className="golden-span">party times:</span>
        </h2>
        <button className="primary-button">
          <p>18.00</p>
        </button>

        <button className="primary-button">
          <p>21.00</p>
        </button>
      </div>
    </div>
  );
};

export default Booking;
