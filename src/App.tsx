import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const fetchRestaurant = async () => {
    const response = await axios.get(
      "https://school-restaurant-api.azurewebsites.net/restaurant/624abd70df8a9fb11c3ea8b8"
    );
    console.log(response.data);
  };

  return (
    <div className="App">
      <button onClick={fetchRestaurant}>hejehejh</button>
    </div>
  );
}

export default App;
