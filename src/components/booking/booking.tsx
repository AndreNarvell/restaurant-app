import "./booking.scss";
import { Slider } from "@material-ui/core";
import Calendar from "react-calendar";
import { useState } from "react";

const Booking = () => {
  const [amount, setAmount] = useState([1]);
  const [date, setDate] = useState(new Date());

  //https://mui.com/components/slider/
  const updateAmount = (e: any, amount: any) => {
    setAmount(amount);
    console.log(amount);
  };

  const handleDate = (date: Date) => {
    setDate(date);
    console.log(date);
  };

  return (
    <div className="bookingContainer">
      <div>
        <button className="bookTable">
          <p>book a table</p>
        </button>
      </div>
      {/* Slider */}
      <div style={{ width: 300, margin: 30 }}>
        <Slider min={1} max={6} onChange={updateAmount} value={amount} />
        {amount}
      </div>
      {/* Calendar */}
      <Calendar onChange={handleDate} value={date} />
      <p>{date.toString()}</p>
    </div>
  );
};

export default Booking;
