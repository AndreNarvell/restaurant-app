
import { ICustomer } from "./ICustomer";
import { IGetBooking } from "./IGetBooking";

export interface IBookingWithCustomers extends IGetBooking {
    customer?: ICustomer

}