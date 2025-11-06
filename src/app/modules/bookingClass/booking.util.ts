import { emailHelper } from "../../../helpers/emailHelper";
import { emailTemplate } from "../../../shared/emailTemplate";
import { BookingClass } from "./bookingClass.model";

// Generate Order ID
const findLastOrderId = async (): Promise<string | undefined> => {
  const lastOrder = await BookingClass.findOne({}, {booking_id: 1, _id: 0 })
    .sort({ createdAt: -1 }) 
    .lean();

  return lastOrder?.booking_id;
};

export const generateOrderId = async (): Promise<string> => {
  const lastId = await findLastOrderId(); 

  let numericPart = 0;

  if (lastId) {
    numericPart = parseInt(lastId, 10) || 0;
  }

  const newIdNumber = numericPart + 1;
  const newId = newIdNumber.toString().padStart(4, '0'); 

  return newId;
};


export const sendBookingConfirmEmail = (email: string) => {
    const welcomeEmailTemplate = emailTemplate.WelcomMessageForClassBooking(email);
    emailHelper.sendEmail(welcomeEmailTemplate);
}