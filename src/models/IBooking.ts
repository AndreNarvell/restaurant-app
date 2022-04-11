import { IClient } from "./IClient";

export interface IBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: IClient;
}
