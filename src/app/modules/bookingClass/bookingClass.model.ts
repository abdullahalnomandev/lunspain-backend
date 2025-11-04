import mongoose, { Model, Schema, Types } from 'mongoose';
import { MEMBERS_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } from './booking.constant';
import { BookingClassModel, IBookingClass } from './bookingClass.interface';


const bookingClassSchema = new Schema<IBookingClass>(
    {
        coupon_code: { type: String },
        club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        class_booking_ref_id: { type: String, required: true },
        price_of_class: { type: String, required: true },
        payment_status: { type: String, enum: Object.values(PAYMENT_STATUS), required: true },
        payment_method: { type: String, enum: Object.values(PAYMENT_METHOD), required: true },
        attandence_status: { type: String, enum: Object.values(MEMBERS_STATUS), required: true },
    },
    { timestamps: true }
);

export const BookingClass = mongoose.model<IBookingClass, BookingClassModel>('BookingClass', bookingClassSchema);
