// import nodemailer from 'nodemailer';
// import config from '../config';
// import { errorLogger, logger } from '../shared/logger';
// import { ISendEmail } from '../types/email';

// const transporter = nodemailer.createTransport({
//   host: config.email.host,
//   port: Number(config.email.port),
//   secure: false,
//   auth: {
//     user: config.email.user,
//     pass: config.email.pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const sendEmail = async (values: ISendEmail) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Lunspain" ${config.email.from}`,
//       to: values.to,
//       subject: values.subject,
//       html: values.html,
//     });

//     logger.info('Mail send successfully', info.accepted);
//   } catch (error) {
//     errorLogger.error('Email', error);
//   }
// };

// export const emailHelper = {
//   sendEmail,
// };


import sgMail from '@sendgrid/mail';
import config from '../config';
import { errorLogger, logger } from '../shared/logger';
import { ISendEmail } from '../types/email';

sgMail.setApiKey(config.sendgrid_api_key as string);

const sendEmail = async (values: ISendEmail) => {
  try {
    const msg = {
      to: values.to,
      from: {
        email: 'noreply@lunaspin.app',
        name: 'Lunaspin'
      },
      subject: values.subject,
      html: values.html,
      trackingSettings: {
        clickTracking: {
          enable: false,
          enableText: false
        }
      }
    };

    await sgMail.send(msg as any);

    logger.info('Mail sent successfully via SendGrid');
  } catch (error) {
    errorLogger.error('SendGrid Email Error', error);
  }
};

export const emailHelper = {
  sendEmail,
};
