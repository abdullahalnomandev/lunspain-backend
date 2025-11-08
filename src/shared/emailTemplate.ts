import { IBookingClass } from '../app/modules/bookingClass/bookingClass.interface';
import { IClass } from '../app/modules/class/class.interface';
import config from '../config';
import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
  const verificationUrl = values.verify_url || '#';

  return {
    to: values.email,
    subject: 'Verify your account',
    html: `
<body style="margin:0;padding:0; min-height:100vh;width:100vw;font-family:'Inter', Arial, sans-serif;">
  <div style="max-width:600px;margin:40px auto 0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(32,19,67,.18);background:#fff;">
    <div style="background:url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80') no-repeat center center / cover;height:80px;"></div>
    <div style="padding:48px 32px 32px 32px;">
      <h1 style="color:#20274d;font-size:1.7rem;font-weight:800;margin-bottom:22px;">Finish setting up your account</h1>
      <p style="color:#222;font-size:17px;line-height:1.6;margin-bottom:22px;">It's fine, we get it–all this talk about your passion has inspired you to drop everything, and go out and get your heart pumping!</p>
      <p style="color:#222;font-size:17px;line-height:1.6;margin-bottom:35px;">But before we all forget again, shall we jump back into finishing the set up of your LunaSpin account?</p>
      <a href="${verificationUrl}" style="display:block;text-align:center;background:#37dfb2;color:#20274d;font-size:17px;border-radius:7px;text-decoration:none;font-weight:800;padding:17px 0;margin-bottom:12px;transition: background .2s;">
        Verify Email
      </a>
      <div style="color:#888;font-size:14px;text-align:center;margin-bottom:35px;">
        If the button above does not work, copy the below URL into your web browser:<br>
        <span style="color:#6272c8;text-decoration:underline;">${verificationUrl}</span>
      </div>
      <div style="margin-bottom:32px;">
        <span style="color:#272d6a;font-size:17px;font-weight:700;">Keep going!</span><br>
        <span style="color:#535a86;font-size:16px;">LunaSpin Team</span>
      </div>
      <hr style="border:none;border-top:1px solid #e4e4e4;margin:28px 0 18px 0;" />
      <div style="color:#7f7f90;text-align:center;font-size:13px;margin-bottom:14px;">
        You're receiving this email because you have an account with LunaSpin.app
      </div>
      <div style="display:flex;justify-content:center;gap:30px;color:#7f7f90;font-size:14px;">
        <a href="#" style="color:#7f7f90;text-decoration:none;">Shop</a>
        <a href="#" style="color:#7f7f90;text-decoration:none;">Contact Us</a>
        <a href="#" style="color:#7f7f90;text-decoration:none;">Privacy Policy</a>
        <a href="#" style="color:#7f7f90;text-decoration:none;">Terms of Use</a>
      </div>
      <div style="text-align:center;color:#b2b6d1;font-size:15px;font-weight:600;margin:23px 0 0 0;">
        DISCOVER & INSPIRE AT LUNASPIN.APP
      </div>
    </div>
  </div>
</body>`,
  };
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `
<body style="margin:0;padding:0;min-height:100vh;width:100vw;font-family:'Inter',Arial,sans-serif;background:#f6f8fa;">
  <div style="max-width:600px;margin:40px auto;padding:40px;background:#fff;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
    <h1 style="color:#20274d;font-size:1.6rem;font-weight:700;margin-bottom:16px;">Reset your password</h1>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:24px;">
      We received a request to reset your password. Click the button below to continue:
    </p>

    <a href="${values.resetLink}" 
      style="display:inline-block;background:#277E16;color:#fff;text-decoration:none;
      font-size:16px;font-weight:600;padding:12px 28px;border-radius:6px;margin:20px 0;">
      Reset Password
    </a>

    <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
    <div style="text-align:center;color:#888;font-size:13px;">
      You're receiving this email because you have an account with LunaSpin.app
    </div>
    <div style="text-align:center;margin-top:10px;">
      <a href="#" style="color:#888;text-decoration:none;margin:0 10px;">Privacy Policy</a> •
      <a href="#" style="color:#888;text-decoration:none;margin:0 10px;">Terms</a>
    </div>
  </div>
</body>
`,
  };
  return data;
};

const updateCompletedWelcomeEmail = (email: string) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>Your profile has been updated successfully.</p>
    </body>
  `,
  };
};

const completeAccount = (email: string) => {
  return {
    to: email,
    subject: 'Complete your Lunspain account',
    html: `
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your account has been completed successfully.</p>
        </div>
    </div>
    <h1>Finish setting up your Lunspain account</h1>
    <p>Your account has been completed successfully.</p>
    </body>
  `,
  };
};


const WelcomMessageForClubCreation = (email: string) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>Your club has been created successfully.</p>
  `,
  };
};


const WelcomMessageForClassCreation = (email: string) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>Your class has been created successfully.</p>
    </body>
  `,
  };
};

const WelcomMessageForClassBooking = (email: string) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>Your class has been booked successfully.</p>
    </body>
  `,
  };
};


const WelcomeMessageForWaitingList = (email: string, waitingEntry: IBookingClass) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>You have been added to the waiting list for this class.</p>
    <p>Name: ${waitingEntry.class}</p>
    <p>Class Booking Ref ID: ${waitingEntry.class_booking_ref_id}</p>
    <p>Booking ID: ${waitingEntry.booking_id}</p>
    <p>Price of Class: ${waitingEntry.price_of_class}</p>
    </body>
  `,
  };
};

const WelcomeMessageForCancellation = (email: string) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
    <body>
    <h1>Welcome to Lunspain</h1>
    <p>Your class booking has been cancelled successfully.</p>
    </body>
  `,
  };
};

const WelcomeMessageForAcceptSpeceASQue = (email: string, classInfo: IClass, classBookingRefId: string, bookingId: string) => {
  return {
    to: email,
    subject: `Spot available – confirm your class ${classInfo.class_name}`,
    html: `
<body style="margin:0;padding:0;min-height:100vh;width:100vw;font-family:'Inter',Arial,sans-serif;background:#f6f8fa;">
  <div style="max-width:600px;margin:40px auto;padding:40px;background:#fff;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
    <h1 style="color:#20274d;font-size:1.6rem;font-weight:700;margin-bottom:16px;">A spot just opened up!</h1>
    <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:12px;">
      Great news—someone cancelled and you’re next on the waiting list.
    </p>

    <table style="width:100%;border-collapse:collapse;margin:24px 0;">
      <tr>
        <td style="padding:8px 0;color:#555;font-weight:600;">Class:</td>
        <td style="padding:8px 0;color:#222;">${classInfo.class_name}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#555;font-weight:600;">Start:</td>
        <td style="padding:8px 0;color:#222;">${classInfo.start_time.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#555;font-weight:600;">Booking ref:</td>
        <td style="padding:8px 0;color:#222;">${classBookingRefId}</td>
      </tr>
    </table>

    <a href="${config.front_end_app_url}/accept-class?lassRef=${classBookingRefId}" 
       style="display:inline-block;background:#277E16;color:#fff;text-decoration:none;font-size:16px;font-weight:600;padding:12px 28px;border-radius:6px;margin:20px 0;">
      Accept my spot
    </a>

    <p style="color:#666;font-size:14px;margin-top:20px;">
      If you don’t confirm within the next 6 hours we’ll offer the spot to the next person in line.
    </p>

    <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
    <div style="text-align:center;color:#888;font-size:13px;">
      You’re receiving this email because you joined the waiting list at Lunspain.
    </div>
    <div style="text-align:center;margin-top:10px;">
      <a href="${config.front_end_app_url}/privacy" style="color:#888;text-decoration:none;margin:0 10px;">Privacy Policy</a> •
      <a href="${config.front_end_app_url}/terms"   style="color:#888;text-decoration:none;margin:0 10px;">Terms</a>
    </div>
  </div>
</body>
`,
  };
}


const RequestToCloseClub = (email: string) => {
  return {
    to: email,
    subject: 'Request to close club',
    html: `
    <body>
    <h1>Request to close club</h1>
    <p>You have requested to close your club. We will close your club after 48 hours if you do not provide marketing permission.</p>
    </body>
  `,
  };
}

const AccountClosedNotificaiton = (email: string) => {
  return {
    to: email,
    subject: 'Account closed',
    html: `
    <body>
    <h1>Account closed</h1>
    <p>Your account has been closed. If you have any questions, please contact us.</p>
    </body>
  `,
  };
}



export const emailTemplate = {
  createAccount,
  resetPassword,
  updateCompletedWelcomeEmail,
  completeAccount,
  WelcomMessageForClubCreation,
  WelcomMessageForClassCreation,
  WelcomMessageForClassBooking,
  WelcomeMessageForWaitingList,
  WelcomeMessageForCancellation,
  WelcomeMessageForAcceptSpeceASQue,
  RequestToCloseClub,
  AccountClosedNotificaiton
};
