import { Response } from 'express';
import mongoose from 'mongoose';
import { Stripe } from 'stripe';
import { BookingClass } from './bookingClass.model';
import { IBookingClass } from './bookingClass.interface';
import { MEMBERS_STATUS, PAYMENT_STATUS } from './booking.constant';
import { User } from '../user/user.model';
import config from '../../../config';
import { Class } from '../class/class.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { sendBookingConfirmEmail } from './booking.util';
import { Club } from '../club/club.model';
import { Coupon } from '../coupon/coupon.model';

// import { RoyalMailOrderService } from './royalmail/order.roymail.service';


export const bookClass = async (payload: IBookingClass, origin: string, coupon_code: string) => {

    payload.attandence_status = MEMBERS_STATUS.INITIAL;

    let discountAmount = 0;
    let couponDescription = '';
    let hasCoupon = false;

    let getSingleCoupon = null;

    if (coupon_code) {
        getSingleCoupon = await Coupon.findOne({ code: coupon_code });
        if (!getSingleCoupon) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Coupon not found');
        }
        hasCoupon = true;
    }

    const type = getSingleCoupon?.type; // percent || fixed;
    const value = getSingleCoupon?.value;

    try {
        const classInfo = await Class.findById(payload.class).lean();
        const userInfo = await User.findById(payload.user).lean().select('+connected_account_id');
        if (!userInfo) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        // Step 1: Create booking record (no transaction)
        payload.payment_status = PAYMENT_STATUS.PENDING;
        const create_booking = await BookingClass.create(payload);

        const club = await Club.findById(classInfo?.club);
        const user = await User.findById(club?.club_creator).select('+connected_account_id');

        const vatRate = 0.45; // transaction charge ($0.45)
        const baseAmount = classInfo?.const_per_ticket || 0;

        // Calculate discount
        if (hasCoupon && type && value) {
            if (type === 'percent') {
                // Only allow non-negative values and not over 100%
                const limitedPercent = Math.max(0, Math.min(value, 100));
                discountAmount = ((baseAmount + vatRate) * limitedPercent) / 100;
                couponDescription = ` (${limitedPercent}% off with coupon code "${coupon_code}")`;
            } else if (type === 'fixed') {
                const fixedDiscount = Math.max(0, Math.min(value, baseAmount + vatRate));
                discountAmount = fixedDiscount;
                couponDescription = ` ($${fixedDiscount} off with coupon code "${coupon_code}")`;
            }
        }

        let discountedBase = (baseAmount + vatRate) - discountAmount;
        if (discountedBase < 0) discountedBase = 0;

        const finalAmount = Math.round(discountedBase * 100); // convert to cents

        // Step 2: Initialize Stripe
        const stripe = new Stripe(config.stripe.secret_key as string, {
            apiVersion: '2025-10-29.clover',
        });

        // Step 3: Create Stripe checkout session
        //@ts-ignore
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: userInfo.email,
            line_items: [
                {
                    price_data: {
                        currency: club?.payment?.currency_of_payment ?? "usd",
                        product_data: {
                            name: classInfo?.class_name as string,
                            description: (classInfo?.description as string || '') +
                                ` (includes $0.45 transaction fee)` +
                                (hasCoupon ? couponDescription : ''),
                        },
                        unit_amount: finalAmount.toString(), // discounted amount in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookingId: create_booking.booking_id.toString(),
                customerId: userInfo._id.toString(),
                ...(hasCoupon ? { coupon_code } : {}),
            },
            payment_intent_data: {
                application_fee_amount: Math.round(finalAmount * 0.1 * 100), // 10% fee
                transfer_data: {
                    destination: String(userInfo?.connected_account_id), // must be acct_xxx
                },
            },
            success_url: `${origin}/api/v1/book-class-attandence/success?status=success&bookingId=${create_booking.booking_id}`,
            cancel_url: `${origin}/api/v1/book-class-attandence/cancel?status=cancel&bookingId=${create_booking.booking_id}`,
        });

        return { redirectStripeUrl: stripeSession.url || "" };

    } catch (error: any) {
        console.log('BOOK CLASS ERROR:', error);
        console.error('BOOK CLASS ERROR:', error?.message || error);

        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Failed to create booking. Please try again.'
        );
    }
};



const bookConfirm = async (bookingId: string, status: string, res: Response) => {
    if (status === 'success') {
        const order = await BookingClass.findOneAndUpdate({ booking_id: bookingId }, { payment_status: PAYMENT_STATUS.PAID, attandence_status: MEMBERS_STATUS.ATTEND }, { new: true });
        const user = await User.findById(order?.user).lean();
        if (order?.booking_id) {
            sendBookingConfirmEmail(user?.email as string, order.class.toString(), order.payment_status, order._id.toString());
        }

        if (order) {
            res.redirect(`${config.front_end_app_url}/booking-success`);
        }
    }
};

const bookCancel = async (bookingId: string, status: string, res: Response) => {
    if (status === 'cancel') {
        const order = await BookingClass.findOneAndDelete({ booking_id: bookingId });
        if (order) {
            res.redirect(`${config.front_end_app_url}/booking-cancel`);
        }
    }
};

export const BookingClassCardService = {
    bookClass,
    bookConfirm,
    bookCancel,
};

// const stripe = require('stripe')(config.stripe_secret_key);


// Create Stripe Checkout session
// const checkoutSession = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     customer_email: guest.email,
//     line_items: [
//         {
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: hotel.name as string,
//                     description: hotel.description as string,
//                     // images:
//                     //     hotel.image && hotel.image.length > 0
//                     //         ? [`${rootUrl}/${hotel.image[0]}`]
//                     //         : [],
//                 },
//                 unit_amount: hotel.roomPrice
//                     ? Math.round(hotel.roomPrice * 100)
//                     : 0,
//             },
//             quantity: 1,
//         },
//     ],
//     metadata: {
//         bookingId: bookingRecord._id.toString(),
//     },
//     payment_intent_data: {
//         application_fee_amount: Math.round(hotel.roomPrice * 0.1 * 100), // 10% fee
//         transfer_data: {
//             destination: host.connectedAccountId as string, // must be acct_xxx
//         },
//     },
//     success_url: `${rootUrl}/api/v1/booking/webhook/${bookingRecord._id}?status=success&userId=${guest._id}`,
//     cancel_url: `${rootUrl}/api/v1/booking/webhook/${bookingRecord._id}?status=cancel&userId=${guest._id}`,
// });
