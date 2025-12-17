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

<body style="margin:0px; padding:0px; font-family:'Poppins',sans-serif; background:#351a57;">

<!-- Section-0 (2-col-Text) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#351a57" style="border-collapse:collapse; width:700px;">
    <tbody>
        <tr>
            <td align="center" valign="top" width="100%">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; width:700px; max-width:700px;">
                    <tbody>
                        
                        <tr>
                            <td height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                        </tr>											

                        <tr>
                            <td align="center" valign="middle" width="100%">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width:100%;">
                                    <tbody>
                                        <tr>
                                            <td width="280" align="center" valign="top" style="display:block;">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width:100%;">
                                                    <tbody>
                                                         <tr>
                                                             <td width="180" valign="top" align="left" style="line-height:1px; text-align:center; display:block;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                                            <td width="280" align="center" valign="middle" style="display:block;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse; border-top-left-radius:15px; border-top-right-radius:15px; width:700px;">
    <tbody>
        <tr>
            <td align="center" valign="top" width="100%">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; width:700px;">
                    <tbody>
                        <tr>
                            <td width="700" valign="middle" align="center" style="line-height:1px; display:block;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg"
                                     border="0" width="700" alt=""
                                     style="display:block; border-top-left-radius:15px; border-top-right-radius:15px; width:700px; height:auto;"
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="border-collapse:collapse; border-bottom-left-radius:10px; border-bottom-right-radius:10px; width:700px;">
    <tbody>
        <tr>
            <td align="center" valign="middle" width="100%">
                <div style="margin:0 auto;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; width:600px; max-width:90%;">
                        <tbody>
                            <tr>
                                <td height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>

                            <tr>
                                <td valign="top" align="left" width="100%"
                                    style="margin:0px; padding:0px; color:#11273b; font-size:36px; line-height:46px; font-weight:600; font-family:'Poppins',sans-serif; text-transform:inherit;">
                                    Confirm your account
                                </td>
                            </tr>
                            <tr>
                                <td height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td valign="top" align="left" width="100%"
                                    style="margin:0px; padding:0px; color:#11273b; font-size:16px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif; text-transform:inherit;">
                                    Click the button below to confirm your account and email address. You'll only have to do this once.
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="line-height:1px;"></td>
                            </tr>
                            <!-- Button -->
                            <tr>
                                <td align="left">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="margin:0px;">
                                        <tr>
                                            <td style="display:inline-block; padding:15px 45px; background:#36c9b8; text-align:center; font-family:'Poppins',sans-serif; font-size:18px; font-weight:500; line-height:16px; color:#11273b; text-transform:inherit; border-radius:10px; border:2px solid #a4d7c5;" width="auto">
                                                <a href="${verificationUrl}" target="_blank"
                                                   style="color:#11273b; font-weight:500; text-decoration:none; display:block; font-size:18px; font-family:'Poppins',sans-serif;">
                                                    Confirm email address
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- END Button -->
                            <tr>
                                <td height="20" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td valign="top" align="left" width="100%"
                                    style="margin:0px; padding:0px; color:#50606f; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif; text-transform:inherit;">
                                    If the button above does not work, copy the below URL into your web browser: <br>
                                    <a href="${verificationUrl}" target="_blank" style="color:#5B88E8; text-decoration:underline; font-family:'Poppins',sans-serif; font-size:13px;">${verificationUrl}</a>
                                </td>
                            </tr>
                            <tr>
                                <td height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td valign="top" align="left" width="100%"
                                    style="margin:0px; padding:0px; color:#50606f; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif; text-transform:inherit;">
                                    If you didn't create an account on
                                    <a target="_blank" href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=account_confirm" style="color:#5B88E8; text-decoration:underline; font-family:'Poppins',sans-serif;">LunaSpin</a>, you can ignore this email.
                                </td>
                            </tr>
                            <tr>
                                <td height="30" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

<!-- Section-0 (Text-Content) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#351a57" style="border-collapse:collapse; width:700px;">
    <tbody>
        <tr>
            <td align="center" valign="middle" width="100%">
                <div style="margin:0 auto;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse: collapse; width:700px; max-width:90%;">
                        <tbody>
                            <tr>
                                <td height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <!-- border bg -->
                            <tr>
                                <td align="center" valign="middle" width="100%" style="border-bottom:1px solid #d7cadd; line-height:1px;"></td>
                            </tr>
                            <!-- End border bg -->
                            <tr>
                                <td height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td valign="top" align="left" width="100%"
                                    style="margin:0px; padding:0px; color:#d7cadd; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif; text-transform:inherit;">
                                    You have received this email because you have created an account on LunaSpin.app
                                </td>
                            </tr>
                            <tr>
                                <td height="10" style="line-height:1px;"></td>
                            </tr>
                            <!-- border bg -->
                            <tr>
                                <td align="center" valign="middle" width="100%" style="border-bottom:1px solid #d7cadd; line-height:1px;"></td>
                            </tr>
                            <!-- End border bg -->
                            <tr>
                                <td height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td align="left" valign="top" width="100%"
                                    style="margin:0; padding:10px 0px 0px 0px; color:#d7cadd; font-family:'Poppins',sans-serif; font-size:18px; line-height:24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="color:inherit; text-decoration:none; display:inline-block; font-family:'Poppins',sans-serif;">
                                        <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Shop
                                    </a>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="color:inherit; text-decoration:none; display:inline-block; font-family:'Poppins',sans-serif;">
                                        <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Contact Us
                                    </a>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="color:inherit; text-decoration:none; display:inline-block; font-family:'Poppins',sans-serif;">
                                        <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Privacy Policy
                                    </a>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="color:inherit; text-decoration:none; display:inline-block; font-family:'Poppins',sans-serif;">
                                        <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Terms of Use
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" valign="top"
                                    style="margin:0px; padding:0px; color:#d7cadd; font-family:'Poppins',sans-serif; font-size:24px; line-height:30px; font-weight:700; text-align:center;">
                                    DISCOVER &amp; INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" valign="top"
                                    style="margin:0px; padding:0px; color:#d7cadd; font-family:'Poppins',sans-serif; font-size:13px; line-height:25px; font-weight:400; text-align:center;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>
                            <tr>
                                <td height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</body>

`,
  };
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `

    <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; width:100% !important; min-width:100% !important; font-family:'Poppins',sans-serif; background-color:#351a57 !important;">

<!-- Section-0 (2-col-Text) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#351a57" style="border-collapse:collapse; width:700px; background-color:#351a57; font-family:'Poppins',sans-serif;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; width:700px;">
                    <tbody>
                        <tr>
                            <td width="100%" height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                        </tr>
                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; width:100%;">
                                    <tbody>
                                        <tr>
                                            <td width="280" align="center" valign="top" style="display:block; width:280px;">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; width:100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td width="180" valign="top" align="left" style="line-height:1px; text-align:left; display:block;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none; font-family: 'Poppins',sans-serif;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" alt="img" style="display:block; width:180px; height:auto;">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                                            <td width="280" align="center" valign="middle" style="display:block; width:280px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td width="100%" height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px; width:700px; background-color:#ffffff; font-family:'Poppins',sans-serif;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; width:700px;">
                    <tbody>
                        <tr>
                            <td width="700" valign="middle" align="center" style="line-height:1px; display:block; width:700px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" alt="" style="display:block; width:700px; height:auto; border-top-left-radius:15px; border-top-right-radius:15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="border-collapse:collapse;border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; width:700px; background-color:#ffffff; font-family:'Poppins',sans-serif;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse; width:600px;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin:0px; padding:0px; color:#11273b; font-size:36px; line-height:46px; font-weight:600; font-family:'Poppins', sans-serif;">
                                    Password reset
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin:0px; padding:0px; color:#11273b; font-size:16px; line-height:26px; font-weight:400; font-family:'Poppins', sans-serif;">
                                    Click the button below to reset your password.
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            <!-- Button -->
                            <tr>
                                <td align="left">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="auto" style="display:inline-block; padding:15px 45px; background:#36c9b8; text-align:center; font-family:'Poppins',sans-serif; font-size:18px; font-weight:500; line-height:16px; color:#11273b; border-radius:10px; border:2px solid #a4d7c5;">
                                                <a href="${
                                                  values.resetLink
                                                }" target="_blank" style="color:#11273b; font-weight:500; text-decoration:none; display:block; font-size:18px; font-family:'Poppins',sans-serif;">Reset password</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- END Button -->
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin:0px; padding:0px; color:#50606f; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif;">
                                    If the button above does not work, copy the below URL into your web browser: <br>
                                    <a href="${
                                      values.resetLink
                                    }" style="color:#5B88E8; text-decoration:underline; font-family:'Poppins',sans-serif;">${
      values.resetLink
    }</a>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin:0px; padding:0px; color:#50606f; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif;">
                                    If you didn't request an password reset on <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=password_reset" style="color:#5B88E8; text-decoration:underline; font-family:'Poppins',sans-serif;">LunaSpin</a>, you can ignore this email.
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="30" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!-- Section-0 (Text-Content) -->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#351a57" style="border-collapse:collapse; width:700px; background-color:#351a57; font-family:'Poppins',sans-serif;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; width:700px;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom:1px solid #d7cadd; line-height:1px;"></td>
                            </tr>
                            <!-- End border bg -->
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin:0px; padding:0px; color:#d7cadd; font-size:13px; line-height:26px; font-weight:400; font-family:'Poppins',sans-serif;">
                                    You have received this email because you requested a password reset on LunaSpin.app
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom:1px solid #d7cadd; line-height:1px;"></td>
                            </tr>
                            <!-- End border bg -->
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0; padding:10px 0px 0px 0px; color:#d7cadd; font-size:18px; line-height:24px; font-weight:600; font-family:'Poppins',sans-serif;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="font-family:'Poppins',sans-serif; text-decoration:none; color:#d7cadd; font-size:18px; font-weight:600; line-height:24px;"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="font-family:'Poppins',sans-serif; text-decoration:none; color:#d7cadd; font-size:18px; font-weight:600; line-height:24px;"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="font-family:'Poppins',sans-serif; text-decoration:none; color:#d7cadd; font-size:18px; font-weight:600; line-height:24px;"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank" style="font-family:'Poppins',sans-serif; text-decoration:none; color:#d7cadd; font-size:18px; font-weight:600; line-height:24px;"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline; margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0; padding:0; color:#d7cadd; font-size:24px; line-height:30px; font-weight:700; font-family:'Poppins',sans-serif; text-align:center;">
                                    DISCOVER &amp; INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="20" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0; padding:0; color:#d7cadd; font-size:13px; line-height:25px; font-weight:400; font-family:'Poppins',sans-serif; text-align:center;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px; display:block; padding:10px 0px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
`,
  };
  return data;
};

const updateCompletedWelcomeEmail = (email: string) => {
  return {
    to: email,
    subject: 'YES, you beauty - welcome to LunaSpin',
    html: `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>YES, you beauty - welcome to LunaSpin</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}
body {
    font-family: 'Poppins', sans-serif;
    background: #351a57;
}
img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; 
    display: block !important; 
    margin-left: auto !important; 
    margin-right: auto !important; 
    float: none !important; 
    width: auto!important; 
}

table.center-on-narrow { 
    display: inline-block !important; 
}


.border-radius-all{
	border-radius: 5px;
}

.border-top-radius{
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}

.border-bottom-radius{
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}


.border-top-both-radius{
	border-top-left-radius: 10px !important;
	border-top-right-radius: 10px !important;
}

.border-bottom-radius-both{
	border-bottom-left-radius: 10px !important;
	border-bottom-right-radius: 10px !important;
}

}


</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>

</head>
<body style="margin:0px; padding:0px; font-family: 'Poppins', sans-serif; background: #351a57;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											


                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                         
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    We're so happy to have you!
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Welcome to LunaSpin, the safe social haven for your community of aerial hoopers, floor-work dancers, and passionate poler's of all genders, culture, and origin.
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    This fast growing community needs support, security, and protection that current popular mainstream social platforms simply can't provide. That's why we're here!
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                    What to expect from LunaSpin?
                                </td>
                            </tr>	

                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

<!-- Section-4 (2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="top">
				<table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
									<tbody>
										<tr>
											<td class="display-block" width="350" align="center" valign="top">
												<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
													<tbody>
														<tr>
															<td width="350" align="center" valign="top" style="line-height:1px;">
																<img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/45998350-92ac-408e-837d-d422d7a78eb9/600x426.jpg" alt="image" width="100%" height="auto" style="display:block;">
															</td>
														</tr>

														<tr>
															<td bgcolor="#ffffff" style="padding: 0 40px;">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
								
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
							
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                                                            We've only just started. No literally!
                                                                        </td>
                                                                    </tr>	

                                                                    <tr>
                                                                        <td width="100%" height="10" style="line-height:1px;"></td>
                                                                    </tr>	
                                                                                                            
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis leo diam, a facilisis massa lobortis quis. Cras eget porta magna, vel laoreet nisl.
                                                                        </td>
                                                                    </tr>
							
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
								
																</table>
															</td>
														</tr>

													</tbody>
												</table>
											</td>

											<td class="display-block" width="350" align="center" valign="top">
												<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
													<tbody>
														<tr>
															<td width="350" align="center" valign="top" style="line-height:1px;">
																<img src="https://i.imgur.com/Pkj1UVd.jpeg" alt="image" width="100%" height="auto" style="display:block;">
															</td>
														</tr>

														<tr>
															<td bgcolor="#ffc2e2" style="padding: 0 40px;">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
								
																									
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
							
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                                                            Climb, spin, perform, and celebrate.
                                                                        </td>
                                                                    </tr>	

                                                                    <tr>
                                                                        <td width="100%" height="10" style="line-height:1px;"></td>
                                                                    </tr>	
                                                                                                            
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis leo diam, a facilisis massa lobortis quis. Cras eget porta magna, vel laoreet nisl.
                                                                        </td>
                                                                    </tr>
							
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
								
																</table>
															</td>
														</tr>

													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>

					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-4 (2-col) -->

<!-- Section-9-(2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#36c9b8">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="middle">
				<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; ">
					<tbody>
						<tr>


							<td class="erase" width="40" style="line-height:1px;"></td>
							
							<td class="display-block padding" width="240" align="center" valign="top">
								<table class="width_90percent text-center" align="left" border="0" cellpadding="0" width="350" cellspacing="0" style="border-collapse:collapse; ">
									<tbody>
										<tr>
											<td class="display-block padding" width="100%" height="30" style="line-height:1px;"></td>
										</tr>

										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
												Show your support
											</td>
										</tr>	


										<tr>
											<td width="100%" height="10" style="line-height:1px;"></td>
										</tr>	

																				
										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
												Comfy LunaSpin jumpers, joggers, zip-ups, and so much more.
											</td>
										</tr>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;"></td>
                                        </tr>
                                        
                                        <!-- Button -->
                                        <tr>
                                            <td align="left">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="display: inline-block; padding: 15px 45px; background: #ffffff; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#11273b; text-transform: inherit; border-radius: 10px; border: 2px solid #72afc2;" width="auto">
                                                            <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=user_welcome" target="_blank" style="color:#11273b;font-weight:500;font-size:18px;text-decoration: none; display: block;">
                                                                Visit out online store
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>   
                                            </td>
                                        </tr>
                                        <!-- END Button -->

										<tr>
											<td class="display-block padding" width="100%" height="20" style="line-height:1px;"></td>
										</tr>
									</tbody>
								</table>
							</td>

                            <td class="display-block" width="250" align="left" valign="top">
								<img src="https://i.imgur.com/UQi1fCV.jpeg" width="100%" height="auto" alt="box-2" border="0" style="display:block">
							</td>
							
							
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-9-(2-col) -->




<!--section-0 Text-Content-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

                        <tr>
                            <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                Welcome to LunaSpin, the safe social haven for your community of aerial hoopers, floor-work dancers, and passionate poler's of all genders, culture, and origin.
                            </td>
                        </tr>	
                            
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                This fast growing community needs support, security, and protection that current popular mainstream social platforms simply can't provide. That's why we're here!
                            </td>
                        </tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>


					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Text-Content End-->

<!-- Section-0 Blank -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>

                            <tr>
                                <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 Blank  End-->

<!-- Section-9-(2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;border-radius: 10px;" bgcolor="#ddcfe2">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="middle">
				<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; ">
					<tbody>
						<tr>

                            
                            <td class="display-block" width="250" align="left" valign="top">
								<img class="border-top-both-radius border-bottom-radius" src="https://i.imgur.com/P8uM0ov.jpeg" width="100%" height="auto" alt="box-2" border="0" style="display:block; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
							</td>

							<td class="erase" width="40" style="line-height:1px;"></td>
							
							<td class="display-block padding" width="240" align="center" valign="top">
								<table class="width_90percent text-center" align="left" border="0" cellpadding="0" width="350" cellspacing="0" style="border-collapse:collapse; ">
									<tbody>
										<tr>
											<td class="display-block padding" width="100%" height="30" style="line-height:1px;"></td>
										</tr>

										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
												Questions and Support
											</td>
										</tr>	

										<tr>
											<td width="100%" height="10" style="line-height:1px;"></td>
										</tr>
																				
										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
												If you have any questions or require support, visit the LunaSpin frequently asked questions and support section below.
											</td>
										</tr>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;"></td>
                                        </tr>
                                        
                                        <!-- Button -->
                                        <tr>
                                            <td align="left">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="display: inline-block; padding: 15px 45px; background: #540d6e; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#FFFFFF; text-transform: inherit; border-radius: 10px; border: 2px solid #966ba6;" width="auto">
                                                            <a href="https://www.lunaspin.app/help?utm_source=app&utm_medium=email&utm_campaign=user_welcome" target="_blank" style="color:#FFFFFF;text-decoration: none; font-weight:500; font-size:18px;display: block;">
                                                                FAQ & Support
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>   
                                            </td>
                                        </tr>
                                        <!-- END Button -->

										<tr>
											<td class="display-block padding" width="100%" height="20" style="line-height:1px;"></td>
										</tr>
									</tbody>
								</table>
							</td>

							
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-9-(2-col) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have booked a class with a club on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>
              
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    2025 Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                             <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    <a href="#" style="color:#d7cadd; text-decoration: underline;">Manager email preference within your account</a>
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>`,
  };
};

const completeAccount = (email: string, linkToCompleteAccount: string) => {
  return {
    to: email,
    subject: 'Complete your Lunspain account',
    html: `
 <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}
img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important; font-family: 'Poppins', sans-serif !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Finish setting up your account
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    It's fine, we get it - all this talk about your passion has inspired you to drop everything, and go and get your heart pumping!
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    But before we all forget again, shall we jump back into finishing the set up of your LunaSpin account?
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <!-- Button -->
                            <tr>
                                <td align="left">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="display: inline-block; padding: 15px 45px; background: #36c9b8; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#11273b; text-transform: inherit; border-radius: 10px; border: 2px solid #a4d7c5;" width="auto">
                                                <a href="${linkToCompleteAccount}" target="_blank" style="color:#11273b;font-weight:500;text-decoration: none; display: block;font-size:18px;">
                                                    Finish account setup
                                                </a>
                                            </td>
                                        </tr>
                                    </table>   
                                </td>
                            </tr>
                            <!-- END Button -->

                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#50606f;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    If the button above does not work, copy the below URL into your web browser: <br>
                                    <a href="${linkToCompleteAccount}" style="color:#5B88E8; text-decoration: underline;">${linkToCompleteAccount}</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                    Keep going!<br>
                                    <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                            </tr>    

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have an account with LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const WelcomMessageForClubCreation = (email: string) => {
  return {
    to: email,
    subject: 'We love seeing new clubs - welcome to LunaSpin',
    html: `
 <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We love seeing new clubs - welcome to LunaSpin</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; 
    display: block !important; 
    margin-left: auto !important; 
    margin-right: auto !important; 
    float: none !important; 
    width: auto!important; 
}

table.center-on-narrow { 
    display: inline-block !important; 
}


.border-radius-all{
	border-radius: 5px;
}

.border-top-radius{
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}

.border-bottom-radius{
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}


.border-top-both-radius{
	border-top-left-radius: 10px !important;
	border-top-right-radius: 10px !important;
}

.border-bottom-radius-both{
	border-bottom-left-radius: 10px !important;
	border-bottom-right-radius: 10px !important;
}

}


</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>

</head>
<body style="margin:0px !important; padding:0px !important; background: #351a57 !important; color: #fff !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											


                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                         
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    New clubs are super exciting
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    We're so happy to see your club has joined LunaSpin, the safe social haven for your community of aerial hoopers, floor-work dancers, and passionate poler's of all genders, culture, and origin.
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    This fast growing community needs support, security, and protection that current popular mainstream social platforms simply can't provide. That's why we are here!
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                    Key features for your club
                                </td>
                            </tr>	

                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

<!-- Section-4 (2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="top">
				<table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
									<tbody>
										<tr>
											<td class="display-block" width="350" align="center" valign="top">
												<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
													<tbody>
														<tr>
															<td width="350" align="center" valign="top" style="line-height:1px;">
																<img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/45998350-92ac-408e-837d-d422d7a78eb9/600x426.jpg" alt="image" width="100%" height="auto" style="display:block;">
															</td>
														</tr>

														<tr>
															<td bgcolor="#ffffff" style="padding: 0 40px;">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
								
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
							
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                                                            Take class booking with club calendars.
                                                                        </td>
                                                                    </tr>	

                                                                    <tr>
                                                                        <td width="100%" height="10" style="line-height:1px;"></td>
                                                                    </tr>	
                                                                                                            
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis leo diam, a facilisis massa lobortis quis. Cras eget porta magna, vel laoreet nisl.
                                                                        </td>
                                                                    </tr>
							
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
								
																</table>
															</td>
														</tr>

													</tbody>
												</table>
											</td>

											<td class="display-block" width="350" align="center" valign="top">
												<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
													<tbody>
														<tr>
															<td width="350" align="center" valign="top" style="line-height:1px;">
																<img src="https://i.imgur.com/Pkj1UVd.jpeg" alt="image" width="100%" height="auto" style="display:block;">
															</td>
														</tr>

														<tr>
															<td bgcolor="#ffc2e2" style="padding: 0 40px;">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
								
																									
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
							
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
                                                                            Immediate reach out to your community.
                                                                        </td>
                                                                    </tr>	

                                                                    <tr>
                                                                        <td width="100%" height="10" style="line-height:1px;"></td>
                                                                    </tr>	
                                                                                                            
                                                                    <tr>
                                                                        <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis leo diam, a facilisis massa lobortis quis. Cras eget porta magna, vel laoreet nisl.
                                                                        </td>
                                                                    </tr>
							
																	<tr>
																		<td class="display-block padding" width="100%" height="40" style="line-height:1px;"></td>
																	</tr>
								
																</table>
															</td>
														</tr>

													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>

					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-4 (2-col) -->

<!-- Section-9-(2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#36c9b8">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="middle">
				<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; ">
					<tbody>
						<tr>

							<td class="erase" width="40" style="line-height:1px;"></td>
							
							<td class="display-block padding" width="240" align="center" valign="top">
								<table class="width_90percent text-center" align="left" border="0" cellpadding="0" width="350" cellspacing="0" style="border-collapse:collapse; ">
									<tbody>
										<tr>
											<td class="display-block padding" width="100%" height="30" style="line-height:1px;"></td>
										</tr>

										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
												Show your support
											</td>
										</tr>	

										<tr>
											<td width="100%" height="10" style="line-height:1px;"></td>
										</tr>	

										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
												Comfy LunaSpin jumpers, joggers, zip-ups, and so much more.
											</td>
										</tr>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;"></td>
                                        </tr>
                                        
                                        <!-- Button -->
                                        <tr>
                                            <td align="left">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="display: inline-block; padding: 15px 45px; background: #ffffff; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#11273b; text-transform: inherit; border-radius: 10px; border: 2px solid #72afc2;" width="auto">
                                                            <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=club_welcome" target="_blank" style="color:#11273b;font-weight:500;font-size:18px;text-decoration: none; display: block;">
                                                                Visit out online store
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>   
                                            </td>
                                        </tr>
                                        <!-- END Button -->

										<tr>
											<td class="display-block padding" width="100%" height="20" style="line-height:1px;"></td>
										</tr>
									</tbody>
								</table>
							</td>

                            <td class="display-block" width="250" align="left" valign="top">
								<img src="https://i.imgur.com/UQi1fCV.jpeg" width="100%" height="auto" alt="box-2" border="0" style="display:block">
							</td>
							
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-9-(2-col) -->


<!--section-0 Text-Content-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>


					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Text-Content End-->

<!-- Section-0 Blank -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>

                            <tr>
                                <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 Blank  End-->

<!-- Section-9-(2-col) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;border-radius: 10px;" bgcolor="#ddcfe2">
	<tbody>
		<tr>
			<td width="100%" align="center" valign="middle">
				<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; ">
					<tbody>
						<tr>

                            
                            <td class="display-block" width="250" align="left" valign="top">
								<img class="border-top-both-radius border-bottom-radius" src="https://i.imgur.com/P8uM0ov.jpeg" width="100%" height="auto" alt="box-2" border="0" style="display:block; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
							</td>

							<td class="erase" width="40" style="line-height:1px;"></td>
							
							<td class="display-block padding" width="240" align="center" valign="top">
								<table class="width_90percent text-center" align="left" border="0" cellpadding="0" width="350" cellspacing="0" style="border-collapse:collapse; ">
									<tbody>
										<tr>
											<td class="display-block padding" width="100%" height="30" style="line-height:1px;"></td>
										</tr>

										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0;color: #000000;font-size:24px;font-weight:600;font-family: 'Poppins',sans-serif;line-height: 35px;">
												Questions and Support
											</td>
										</tr>	

										<tr>
											<td width="100%" height="10" style="line-height:1px;"></td>
										</tr>
																				
										<tr>
											<td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color: #000000;font-size:16px;font-weight:400;font-family: 'Poppins',sans-serif;line-height: 26px;">
												If you have any questions or require support, visit the LunaSpin frequently asked questions and support section below.
											</td>
										</tr>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;"></td>
                                        </tr>
                                        
                                        <!-- Button -->
                                        <tr>
                                            <td align="left">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="display: inline-block; padding: 15px 45px; background: #540d6e; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#FFFFFF; text-transform: inherit; border-radius: 10px; border: 2px solid #966ba6;" width="auto">
                                                            <a href="https://www.lunaspin.app/help?utm_source=app&utm_medium=email&utm_campaign=club_welcome" target="_blank" style="color:#FFFFFF;text-decoration: none; font-weight:500; font-size:18px;display: block;">
                                                                FAQ & Support
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>   
                                            </td>
                                        </tr>
                                        <!-- END Button -->

										<tr>
											<td class="display-block padding" width="100%" height="20" style="line-height:1px;"></td>
										</tr>
									</tbody>
								</table>
							</td>

							
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<!-- End-Section-9-(2-col) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have created a new club on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>
              
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                             <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    <a href="#" style="color:#d7cadd; text-decoration: underline;">Manager email preference within your account</a>
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const WelcomMessageForClassCreation = (email: string, classInfo: IClass) => {
  return {
    to: email,
    subject: `New class created: ${classInfo.class_name}`,
    html: `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
        <body style="margin:0px; padding:0px; background: #351a57 !important; font-family: 'Poppins', sans-serif !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    New class has been created
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    A new <strong>${
                                      classInfo.class_name
                                    }</strong> class has been successfully created for <strong>${
      (classInfo.club as any)?.name
    }</strong>.
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    An overview of the created class is available below.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="0" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!--section-0 Invoice-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-top-left-radius: 10px; border-top-right-radius: 10px;" bgcolor="#ffe7f3">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="300" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.class_name
                                                                                } <br>
                                                                                ${new Date(
                                                                                  classInfo.date_of_class
                                                                                )
                                                                                  .toLocaleDateString(
                                                                                    'en-GB',
                                                                                    {
                                                                                      day: 'numeric',
                                                                                      month:
                                                                                        'short',
                                                                                      year: 'numeric',
                                                                                    }
                                                                                  )
                                                                                  .replace(
                                                                                    / /g,
                                                                                    ' '
                                                                                  )} <br>
                                                                                ${(() => {
                                                                                  const [
                                                                                    hours,
                                                                                    minutes,
                                                                                  ] =
                                                                                    classInfo.start_time.split(
                                                                                      ':'
                                                                                    );
                                                                                  const date =
                                                                                    new Date();
                                                                                  date.setHours(
                                                                                    parseInt(
                                                                                      hours,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  date.setMinutes(
                                                                                    parseInt(
                                                                                      minutes,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  // Format to 12-hour time with AM/PM
                                                                                  return date.toLocaleTimeString(
                                                                                    'en-US',
                                                                                    {
                                                                                      hour: 'numeric',
                                                                                      minute:
                                                                                        '2-digit',
                                                                                      hour12:
                                                                                        true,
                                                                                    }
                                                                                  );
                                                                                })()}
                                                                                
                                                                                - <span style="font-size: 15px; font-weight: 400;">${
                                                                                  classInfo.duration
                                                                                }</span>
                                                                            </td>
																			
																			<td class="display-block padding" width="150" align="center" valign="top" height="50"></td>

																			<td width="300" align="right" valign="top" style="margin:0px;padding-right: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 400;color: #000000;" height="50">
                                                                                Class ID: <span style="font-size: 15px; font-weight: 700;">${String(
                                                                                  classInfo._id
                                                                                ).slice(
                                                                                  -9
                                                                                )}</span> <br>
                                                                                Cost Per Ticket: <span style="font-size: 15px; font-weight: 700;">${
                                                                                  classInfo.const_per_ticket
                                                                                }</span><br>
                                                                                Max. Spaces or Attendees: <span style="font-size: 15px; font-weight: 700;">${
                                                                                  classInfo.max_number_of_attendees
                                                                                }</span>
                                                                                Repeated Class: <span style="font-size: 15px; font-weight: 700;">${
                                                                                  classInfo
                                                                                    .reoccurring_class
                                                                                    .repeat
                                                                                }</span>
                                                                            </td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>

													</tbody>
												</table>
											</td>
										</tr>

										<tr>
											<td width="100%" height="40" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="100%" align="left" valign="top" style="margin:0px;padding-left: 10px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="30">Class Description:</td>
																		</tr>

                                                                        <tr>
																			<td width="100%" align="left" valign="top" style="margin:0px;padding-left:10px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;">
                                                                                ${
                                                                                  classInfo.description
                                                                                }
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">Club Address:</td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="top" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.location
                                                                                }
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:13px; line-height: 24px; font-weight:400;">
                                If you don't recognise this club, please <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=class_created" style="color:#5B88E8; text-decoration: underline;">contact</a> the LunaSpin team.
                            </td>
                        </tr>
                        
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep inspiring!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>

					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Invoice End-->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have created a class on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const WelcomMessageForClassBooking = (
  email: string,
  classInfo: IClass,
  booking_status: string,
  booking_ref_id: string
) => {
  return {
    to: email,
    subject: `Class booking confirmed: ${classInfo.class_name}`,
    html: `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}
img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important; font-family: 'Poppins', sans-serif !important;">
<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Your class is booked
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Your <strong> ${
                                      classInfo.class_name
                                    }</strong> class has been successfully confirmed and booked with club <strong>${
      (classInfo.club as any)?.name
    }</strong>.
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Full booking details are available below.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="0" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!--section-0 Invoice-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-top-left-radius: 10px; border-top-right-radius: 10px;" bgcolor="#ffe7f3">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="300" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.class_name
                                                                                } <br>
                                                                                ${new Date(
                                                                                  classInfo.date_of_class
                                                                                )
                                                                                  .toLocaleDateString(
                                                                                    'en-GB',
                                                                                    {
                                                                                      day: 'numeric',
                                                                                      month:
                                                                                        'short',
                                                                                      year: 'numeric',
                                                                                    }
                                                                                  )
                                                                                  .replace(
                                                                                    / /g,
                                                                                    ' '
                                                                                  )} <br>
                                                                                ${(() => {
                                                                                  const [
                                                                                    hours,
                                                                                    minutes,
                                                                                  ] =
                                                                                    classInfo.start_time.split(
                                                                                      ':'
                                                                                    );
                                                                                  const date =
                                                                                    new Date();
                                                                                  date.setHours(
                                                                                    parseInt(
                                                                                      hours,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  date.setMinutes(
                                                                                    parseInt(
                                                                                      minutes,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  // Format to 12-hour time with AM/PM
                                                                                  return date.toLocaleTimeString(
                                                                                    'en-US',
                                                                                    {
                                                                                      hour: 'numeric',
                                                                                      minute:
                                                                                        '2-digit',
                                                                                      hour12:
                                                                                        true,
                                                                                    }
                                                                                  );
                                                                                })()}
                                                                                - <span style="font-size: 15px; font-weight: 400;">${
                                                                                  classInfo.duration
                                                                                }</span>
                                                                            </td>
																			
																			<td class="display-block padding" width="150" align="center" valign="top" height="50"></td>

																			<td width="300" align="right" valign="top" style="margin:0px;padding-right: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 400;color: #000000;" height="50">
                                                                                Booking ID: <span style="font-size: 15px; font-weight: 700;">${classInfo._id
                                                                                  ?.toString()
                                                                                  .slice(
                                                                                    -9
                                                                                  )}</span> <br>
                                                                                Payment Amount: <span style="font-size: 15px; font-weight: 700;">${(
                                                                                  classInfo.const_per_ticket +
                                                                                  0.45
                                                                                ).toFixed(
                                                                                  2
                                                                                )}</span><br>
                                                                                Payment Status: <span style="font-size: 15px; font-weight: 700;">${booking_status}</span>
                                                                            </td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
														
														

													</tbody>
												</table>
											</td>
										</tr>

										<tr>
											<td width="100%" height="40" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">Club Address:</td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="top" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.location
                                                                                }
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:13px; line-height: 24px; font-weight:400;">
                                If you don't recognise this club, please <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=booking_cancelled" style="color:#5B88E8; text-decoration: underline;">contact</a> the LunaSpin team.
                            </td>
                        </tr>
                        
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>

					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Invoice End-->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have booked a class on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    2025 Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const WelcomeMessageForWaitingList = (
  email: string,
  classInfo: IClass,
  bookingId: string
) => {
  return {
    to: email,
    subject: 'Welcome to Lunspain',
    html: `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important; font-family: 'Poppins', sans-serif !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You're on the waiting list
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have been added to the <strong>${
                                      classInfo.class_name
                                    }</strong> class waiting list with club <strong>${
      (classInfo?.club as any)?.name
    }</strong>.
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    When a space becomes available, we will email you. You will have 30 minutes from the time the email to accept the space.
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Full waiting list details are available below.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="0" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!--section-0 Invoice-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-top-left-radius: 10px; border-top-right-radius: 10px;" bgcolor="#ffe7f3">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="300" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">
																				${classInfo.class_name} <br>
																				${new Date(classInfo.date_of_class)
                                          .toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                          })
                                          .replace(/ /g, ' ')} <br>
																				${(() => {
                                          const [hours, minutes] =
                                            classInfo.start_time.split(':');
                                          const date = new Date();
                                          date.setHours(parseInt(hours, 10));
                                          date.setMinutes(
                                            parseInt(minutes, 10)
                                          );
                                          // Format to 12-hour time with AM/PM
                                          return date.toLocaleTimeString(
                                            'en-US',
                                            {
                                              hour: 'numeric',
                                              minute: '2-digit',
                                              hour12: true,
                                            }
                                          );
                                        })()}
																				- <span style="font-size: 15px; font-weight: 400;">${classInfo.duration}</span>
																			</td>
																			
																			<td class="display-block padding" width="150" align="center" valign="top" height="50"></td>

																			<td width="300" align="right" valign="top" style="margin:0px;padding-right: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 400;color: #000000;" height="50">
																				Booking ID: <span style="font-size: 15px; font-weight: 700;">${bookingId
                                          ?.toString()
                                          .slice(-9)}</span> <br>
																				Class Total: <span style="font-size: 15px; font-weight: 700;">${(
                                          classInfo.const_per_ticket + 0.45
                                        ).toFixed(2)}</span><br>
																				Booking Status: <span style="font-size: 15px; font-weight: 700;">Queueing</span>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
														
														

													</tbody>
												</table>
											</td>
										</tr>



										<tr>
											<td width="100%" height="40" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">Club Address:</td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="top" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">
                                                                                [CLASS-ADDRESS]
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:13px; line-height: 24px; font-weight:400;">
                                If you don't recognise this club, please <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=booking_waitlist" style="color:#5B88E8; text-decoration: underline;">contact</a> the LunaSpin team.
                            </td>
                        </tr>
                        
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>

					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Invoice End-->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have joined a class waiting list on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    2025 Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const MessageForCancellation = (
  email: string,
  classInfo: IClass,
  bookingId: string,
  paymentStatus: string
) => {
  return {
    to: email,
    subject: 'You have cancelled a booking',
    html: `
  <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You've cancelled a booking
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Your <strong>${
                                      classInfo.class_name
                                    }</strong> class has been cancelled.
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Full cancellation details are available below.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="0" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!--section-0 Invoice-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-top-left-radius: 10px; border-top-right-radius: 10px;" bgcolor="#ffe7f3">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="middle" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">New Status: <span style="font-weight: 600; color: #db2131;">Cancelled</span></td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="middle" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">Refund Status: <span style="font-weight: 600; color: #db2131;">1x Credit Issued</span></td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>

                                                        <tr>
                                                            <td width="100%" height="5" style="line-height:1px;"></td>
                                                        </tr>


                                                        <!-- border bg -->
                                                        <tr>
                                                            <td width="100%" align="center" valign="middle" style="border-bottom: 2px solid #d2d5d9; line-height: 2px;">
                                                            </td>
                                                        </tr>
                                                        <!-- End border bg -->

                                                        
                                                        <tr>
                                                            <td width="100%" height="10" style="line-height:1px;"></td>
                                                        </tr>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="300" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.class_name
                                                                                } <br>
                                                                                ${new Date(
                                                                                  classInfo.date_of_class
                                                                                )
                                                                                  .toLocaleDateString(
                                                                                    'en-GB',
                                                                                    {
                                                                                      day: 'numeric',
                                                                                      month:
                                                                                        'short',
                                                                                      year: 'numeric',
                                                                                    }
                                                                                  )
                                                                                  .replace(
                                                                                    / /g,
                                                                                    ' '
                                                                                  )} <br>
                                                                                ${(() => {
                                                                                  const [
                                                                                    hours,
                                                                                    minutes,
                                                                                  ] =
                                                                                    classInfo.start_time.split(
                                                                                      ':'
                                                                                    );
                                                                                  const date =
                                                                                    new Date();
                                                                                  date.setHours(
                                                                                    parseInt(
                                                                                      hours,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  date.setMinutes(
                                                                                    parseInt(
                                                                                      minutes,
                                                                                      10
                                                                                    )
                                                                                  );
                                                                                  // Format to 12-hour time with AM/PM
                                                                                  return date.toLocaleTimeString(
                                                                                    'en-US',
                                                                                    {
                                                                                      hour: 'numeric',
                                                                                      minute:
                                                                                        '2-digit',
                                                                                      hour12:
                                                                                        true,
                                                                                    }
                                                                                  );
                                                                                })()}
                                                                                - <span style="font-size: 15px; font-weight: 400;">${
                                                                                  classInfo.duration
                                                                                }</span>
                                                                            </td>
																			
																			<td class="display-block padding" width="150" align="center" valign="top" height="50"></td>

																			<td width="300" align="right" valign="top" style="margin:0px;padding-right: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 400;color: #000000;" height="50">
                                                                                Booking ID: <span style="font-size: 15px; font-weight: 700;">${bookingId}</span> <br>
                                                                                Payment Amount: <span style="font-size: 15px; font-weight: 700;">${(
                                                                                  classInfo.const_per_ticket +
                                                                                  0.45
                                                                                ).toFixed(
                                                                                  2
                                                                                )}</span><br>
                                                                                Payment Status: <span style="font-size: 15px; font-weight: 700;">${paymentStatus}</span>
                                                                            </td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
														
														

													</tbody>
												</table>
											</td>
										</tr>



										<tr>
											<td width="100%" height="40" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">Club Address:</td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="top" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.location
                                                                                }
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:13px; line-height: 24px; font-weight:400;">
                                If you don't recognise this club, please <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=booking_cancelled" style="color:#5B88E8; text-decoration: underline;">contact</a> the LunaSpin team.
                            </td>
                        </tr>
                        
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>

					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Invoice End-->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have cancelled a booking on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    2025 Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const WelcomeMessageForAcceptSpeceASQue = (
  email: string,
  classInfo: IClass,
  classBookingRefId: string,
  bookingId: string
) => {
  return {
    to: email,
    subject: `A space has become available`,
    html: `

    <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important;">
<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://app.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">Log In</a>
                                                                <span>&nbsp;&#9679;&nbsp;</span>
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    A space has become available
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You need to be quick, as a space has become available. You have 30 minutes from the time of this email to accept your placement.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <!-- Button -->
                            <tr>
                                <td align="left">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="display: inline-block; padding: 15px 45px; background: #36c9b8; text-align: center; font-family:'Poppins', sans-serif; font-size: 18px; font-weight: 500; line-height: 16px; color:#11273b; text-transform: inherit; border-radius: 10px; border: 2px solid #a4d7c5;" width="auto">
                                                <a href="${
                                                  config.front_end_app_url
                                                }/accept-class?classRef=${classBookingRefId}" target="_blank" style="color:#11273b;font-weight:500;text-decoration: none; display: block;font-size:18px;">
                                                    Accept space
                                                </a>
                                            </td>
                                        </tr>
                                    </table>   
                                </td>
                            </tr>
                            <!-- END Button -->

                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#50606f;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    If the button above does not work, copy the below URL into your web browser: <br>
                                    <a href="#" style="color:#5B88E8; text-decoration: underline;">${
                                      config.front_end_app_url
                                    }/accept-class?classRef=${classBookingRefId}</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Full waiting list details are available below.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="0" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!--section-0 Invoice-->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
	<tbody>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>

		<tr>
			<td width="100%" align="center" valign="middle">
				<table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse:collapse;">
					<tbody>

						<tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-top-left-radius: 10px; border-top-right-radius: 10px;" bgcolor="#ffe7f3">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>
														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="300" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">
																				${classInfo.class_name} <br>
																				${new Date(classInfo.date_of_class)
                                          .toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                          })
                                          .replace(/ /g, ' ')} <br>
																				${(() => {
                                          const [hours, minutes] =
                                            classInfo.start_time.split(':');
                                          const date = new Date();
                                          date.setHours(parseInt(hours, 10));
                                          date.setMinutes(
                                            parseInt(minutes, 10)
                                          );
                                          // Format to 12-hour time with AM/PM
                                          return date.toLocaleTimeString(
                                            'en-US',
                                            {
                                              hour: 'numeric',
                                              minute: '2-digit',
                                              hour12: true,
                                            }
                                          );
                                        })()}
																				- <span style="font-size: 15px; font-weight: 400;">${classInfo.duration}</span>
																			</td>
																			
																			<td class="display-block padding" width="150" align="center" valign="top" height="50"></td>
																			
																			<td width="300" align="right" valign="top" style="margin:0px;padding-right: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 400;color: #000000;" height="50">
																				Booking ID: <span style="font-size: 15px; font-weight: 700;">${bookingId}</span> <br>
																				Class Total: <span style="font-size: 15px; font-weight: 700;">
																					${(classInfo.const_per_ticket + 0.45).toFixed(2)}
																				</span><br>
																				Booking Status: <span style="font-size: 15px; font-weight: 700;">
																					Offered
																				</span>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>

										<tr>
											<td width="100%" height="40" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
							<td width="100%" align="center" valign="middle">
								<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#f7f7f7">
									<tbody>

                                        <tr>
                                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                                        </tr>

										<tr>
											<td width="100%" align="center" valign="middle">
												<table class="width_90percent" align="center" border="0" cellpadding="0" width="570" cellspacing="0" style="border-collapse: collapse;">
													<tbody>

														<tr>
															<td width="100%" align="center" valign="middle">
																<table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
																	<tbody>
																		<tr>
																			<td width="215" align="left" valign="top" style="margin:0px;padding-left: 10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: 600;color: #000000;" height="50">Club Address:</td>
																			
																			<td class="display-block padding" width="20" align="center" valign="top" height="50"></td>

																			<td width="250" align="right" valign="top" style="margin:0px;padding-right:10px;font-size:16px;font-family: 'Poppins', sans-serif;text-transform:inherit;font-weight: normal;color: #000000;" height="50">
                                                                                ${
                                                                                  classInfo.location
                                                                                }
                                                                            </td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>


													</tbody>
												</table>
											</td>
										</tr>

                                        <tr>
											<td width="100%" height="20" style="line-height:1px;"></td>
										</tr>

									</tbody>
								</table>
							</td>
						</tr>

                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:13px; line-height: 24px; font-weight:400;">
                                If you don't recognise this club, please <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=booking_waitlist" style="color:#5B88E8; text-decoration: underline;">contact</a> the LunaSpin team.
                            </td>
                        </tr>
                        
                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                        <tr>
                            <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                Keep going!<br>
                                <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                            </td>
                        </tr>

					</tbody>
				</table>
			</td>
		</tr>

        <tr>
            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
        </tr>



	</tbody>
</table>
<!--section-0 Invoice End-->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have joined a class waiting list on the LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    2025 Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>

`,
    //     html: `
    // <body style="margin:0;padding:0;min-height:100vh;width:100vw;font-family:'Inter',Arial,sans-serif;background:#f6f8fa;">
    //   <div style="max-width:600px;margin:40px auto;padding:40px;background:#fff;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
    //     <h1 style="color:#20274d;font-size:1.6rem;font-weight:700;margin-bottom:16px;">A spot just opened up!</h1>
    //     <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:12px;">
    //       Great news—someone cancelled and you’re next on the waiting list.
    //     </p>

    //     <table style="width:100%;border-collapse:collapse;margin:24px 0;">
    //       <tr>
    //         <td style="padding:8px 0;color:#555;font-weight:600;">Class:</td>
    //         <td style="padding:8px 0;color:#222;">${classInfo.class_name}</td>
    //       </tr>
    //       <tr>
    //         <td style="padding:8px 0;color:#555;font-weight:600;">Start:</td>
    //         <td style="padding:8px 0;color:#222;">${classInfo.start_time.toLocaleString()}</td>
    //       </tr>
    //       <tr>
    //         <td style="padding:8px 0;color:#555;font-weight:600;">Booking ref:</td>
    //         <td style="padding:8px 0;color:#222;">${classBookingRefId}</td>
    //       </tr>
    //     </table>

    //     <a href="${
    //       config.front_end_app_url
    //     }/accept-class?lassRef=${classBookingRefId}"
    //        style="display:inline-block;background:#277E16;color:#fff;text-decoration:none;font-size:16px;font-weight:600;padding:12px 28px;border-radius:6px;margin:20px 0;">
    //       Accept my spot
    //     </a>

    //     <p style="color:#666;font-size:14px;margin-top:20px;">
    //       If you don’t confirm within the next 6 hours we’ll offer the spot to the next person in line.
    //     </p>

    //     <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
    //     <div style="text-align:center;color:#888;font-size:13px;">
    //       You’re receiving this email because you joined the waiting list at Lunspain.
    //     </div>
    //     <div style="text-align:center;margin-top:10px;">
    //       <a href="${
    //         config.front_end_app_url
    //       }/privacy" style="color:#888;text-decoration:none;margin:0 10px;">Privacy Policy</a> •
    //       <a href="${
    //         config.front_end_app_url
    //       }/terms"   style="color:#888;text-decoration:none;margin:0 10px;">Terms</a>
    //     </div>
    //   </div>
    // </body>
    // `,
  };
};

const RequestToCloseClub = (email: string) => {
  return {
    to: email,
    subject: 'Request to close club',
    html: `
 <!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!-- jQuery Plugin -->

<style type="text/css">
div, p, a, li, td {
    -webkit-text-size-adjust: none;
    font-family: 'Poppins', sans-serif;
}

img {
    display: block;
}
table {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    color: inherit;
    display: inline-block;
}
p {
    margin: 0px;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
}
</style>
<style type="text/css">
@media only screen and (max-width: 920px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
.tpl-content {
    padding: 0px !important;
}
img {
    max-width: 100%;
    height: auto;
}
.width_50percent {
    max-width: 50%;
    margin: 0 auto !important;
    width: 50% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 720px) {
.width_100 {
    width: 100%;
    max-width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.tablet-resp-block {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.tablet-resp-erase {
    display: none !important;
    height: 0px !important;
}
.width_50percent {
    max-width: 100%;
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 620px) {
.border-none {
    border:none !important;
}
.padding-top-bottom {
    padding: 20px 0px;
}
.height-and-padding-bottom {
    height: auto;
    padding-bottom: 20px !important;
}
.width_90percent {
    width: 90% !important;
    max-width: 90%;
    margin: 0 auto !important;
    height: auto!important;
}
.display-block {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}
.width_90percent .width_100percent {
    width: 100% !important;
    height: auto;
    display: block;
    margin: 0 auto !important;
}
.width_100percent {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
}
.tbody-and-tr {
    display: block !important;
    width: 100% !important;
    height: auto !important;
}
.padding-top {
    padding-top: 10px;
}
.padding {
    padding: 10px 0px;
}

.padding {
    padding: 10px 0px;
}

.padding-15 {
    padding: 15px 0px;
}

.padding-20 {
    padding: 20px 0px;
}

.padding-25 {
    padding: 25px 0px;
}

.padding-30 {
    padding: 30px 0px;
}

.padding-35 {
    padding: 35px 0px;
}

.padding-40 {
    padding: 40px 0px;
}

.padding-50 {
    padding: 40px 0px;
}

.logo-outer {
    text-align: center;
}
.padding-top-60 {
    padding-top: 60px !important;
    height: auto;
    display: block;
}
.padding-bottom-60 {
    padding-bottom: 60px !important;
    height: auto;
    display: block;
}
.img-center img {
    margin: 0 auto !important;
}
.erase {
    display: none;
    height: 0px;
}
.text-center {
    float: none !important;
    text-align: center;
    text-align: -webkit-center;
}
.text-left {
    float: none !important;
    text-align: left;
    text-align: -webkit-left;
}
.text-right {
    float: none !important;
    text-align: right;
    text-align: -webkit-right;
}
.hero-section-font-1 {
    font-size: 24px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.hero-section-font-2 {
    font-size: 36px !important;
    line-height: normal !important;
    letter-spacing: normal !important
}
.res-font-white {
    color: #FFFFFF !important;
}
.full-width-img img {
    width: 100%;
    height: auto;
}
.resp-remove-bg {
    background: #333333 !important;
}
.background-img {
    background-image: none !important;
}
.background-cover {
    background-size: cover !important;
}
.block-with-height {
    display: inline-block;
    width: 100%;
}
.inline-block {
    display: inline-block;
}
.left-right-pad {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
.padding-zero {
    padding: 0px 0px 0px 0px !important;
}

.center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
table.center-on-narrow { display: inline-block !important; }
}
</style>

<style type="text/css">
@media only screen and (max-width: 420px) {
.menu {
    font-size: 12px !important;
}
.display-block-mob {
    display: block !important;
    height: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
}

.resp-menu {
    font-size: 10px !important;
    font-weight: bold !important;
}
.side-border {
    border: 1px solid #5a5a5a !important;
    border-left: 0px !important;
    border-right: 0px !important;
}
}
</style>
</head>
<body style="margin:0px; padding:0px; background: #351a57 !important;">

<!-- Section-0 (2-col-Text) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        
                        <tr>
                            <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                        </tr>											

                        <tr>
                            <td width="100%" align="center" valign="middle">
                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td class="display-block" width="280" align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>

                                                         <tr>
                                                             <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                    <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                </a>
                                                             </td>
                                                         </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>

                                            <td class="display-block padding" width="40" style="line-height:1px;"></td>

                                            <td class="display-block" width="280" align="center" valign="middle">
                                                <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                    <tbody>
                                                         
                                                         <tr>
                                                            <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                            </td>
                                                        </tr>	
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>


                        <tr>
                            <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (2-col-Text) -->

<!-- Section-0 (Fluid-Banner) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="top">
                <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                    <tbody>
                        <tr>
                            <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- End-Section-0 (Fluid-Banner) -->

<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Request to close your club
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>
                            
                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Your request to close club <strong>[CLUB-NAME]</strong> has been submitted.
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr>


                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    Closure requests may take up to 48 hours to process. You'll receive an confirmation email once this has been complete.
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#50606f;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    If you didn't request a club closure, <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=club_preclosure" style="color:#5B88E8; text-decoration: underline;">contact our support team</a> immediately!
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                    Keep going!<br>
                                    <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                                </td>
                            </tr>

                            <tr>
                                <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                            </tr>    

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->
 
<!-- Section-0 (Text-Content) -->
<table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
    <tbody>
        <tr>
            <td width="100%" align="center" valign="middle">
                <div style="margin:0 auto">
                    <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                    You have received this email because you have an account with LunaSpin.app
                                </td>
                            </tr>	
                            
                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <!-- border bg -->
                            <tr>
                                <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                </td>
                            </tr>
                            <!-- End border bg -->

                            <tr>
                                <td width="100%" height="10" style="line-height:1px;"></td>
                            </tr>

                            <tr>
                                <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                    <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                </td>
                            </tr>
                            
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 
                            
                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                    DISCOVER & INSPIRE AT <br>
                                    LUNASPIN.APP
                                </td>
                            </tr>

                                                        
                            <tr>
                                <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                            </tr> 

                            <tr>
                                <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                    ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                </td>
                            </tr>


                            <tr>
                                <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<!-- Section-0 (Text-Content)  End-->

</body>
</html>
  `,
  };
};

const AccountClosedNotificaiton = (email: string) => {
  return {
    to: email,
    subject: 'Request to close your account',
    html: `
    <!doctype html>
   <html>
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title></title>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
   
   <!-- jQuery Plugin -->
   
   <style type="text/css">
   div, p, a, li, td {
       -webkit-text-size-adjust: none;
       font-family: 'Poppins', sans-serif;
   }
   
   img {
       display: block;
   }
   table {
       mso-table-lspace: 0pt !important;
       mso-table-rspace: 0pt !important;
   }
   a {
       text-decoration: none;
       font-family: 'Poppins', sans-serif;
       color: inherit;
       display: inline-block;
   }
   p {
       margin: 0px;
       padding: 0px;
       font-family: 'Poppins', sans-serif;
   }
   </style>
   <style type="text/css">
   @media only screen and (max-width: 920px) {
   .width_100 {
       width: 100%;
       max-width: 100%;
   }
   .tpl-content {
       padding: 0px !important;
   }
   img {
       max-width: 100%;
       height: auto;
   }
   .width_50percent {
       max-width: 50%;
       margin: 0 auto !important;
       width: 50% !important;
   }
   }
   </style>
   
   <style type="text/css">
   @media only screen and (max-width: 720px) {
   .width_100 {
       width: 100%;
       max-width: 100%;
   }
   img {
       max-width: 100%;
       height: auto;
   }
   .tablet-resp-block {
       display: block !important;
       width: 100% !important;
       height: auto !important;
   }
   .tablet-resp-erase {
       display: none !important;
       height: 0px !important;
   }
   .width_50percent {
       max-width: 100%;
       display: block !important;
       height: auto !important;
       margin: 0 auto !important;
       width: 100% !important;
   }
   }
   </style>
   
   <style type="text/css">
   @media only screen and (max-width: 620px) {
   .border-none {
       border:none !important;
   }
   .padding-top-bottom {
       padding: 20px 0px;
   }
   .height-and-padding-bottom {
       height: auto;
       padding-bottom: 20px !important;
   }
   .width_90percent {
       width: 90% !important;
       max-width: 90%;
       margin: 0 auto !important;
       height: auto!important;
   }
   .display-block {
       display: block !important;
       height: auto !important;
       margin: 0 auto !important;
       width: 100% !important;
   }
   .width_90percent .width_100percent {
       width: 100% !important;
       height: auto;
       display: block;
       margin: 0 auto !important;
   }
   .width_100percent {
       width: 100% !important;
       height: auto;
       margin: 0 auto !important;
   }
   .tbody-and-tr {
       display: block !important;
       width: 100% !important;
       height: auto !important;
   }
   .padding-top {
       padding-top: 10px;
   }
   .padding {
       padding: 10px 0px;
   }
   
   .padding {
       padding: 10px 0px;
   }
   
   .padding-15 {
       padding: 15px 0px;
   }
   
   .padding-20 {
       padding: 20px 0px;
   }
   
   .padding-25 {
       padding: 25px 0px;
   }
   
   .padding-30 {
       padding: 30px 0px;
   }
   
   .padding-35 {
       padding: 35px 0px;
   }
   
   .padding-40 {
       padding: 40px 0px;
   }
   
   .padding-50 {
       padding: 40px 0px;
   }
   
   .logo-outer {
       text-align: center;
   }
   .padding-top-60 {
       padding-top: 60px !important;
       height: auto;
       display: block;
   }
   .padding-bottom-60 {
       padding-bottom: 60px !important;
       height: auto;
       display: block;
   }
   .img-center img {
       margin: 0 auto !important;
   }
   .erase {
       display: none;
       height: 0px;
   }
   .text-center {
       float: none !important;
       text-align: center;
       text-align: -webkit-center;
   }
   .text-left {
       float: none !important;
       text-align: left;
       text-align: -webkit-left;
   }
   .text-right {
       float: none !important;
       text-align: right;
       text-align: -webkit-right;
   }
   .hero-section-font-1 {
       font-size: 24px !important;
       line-height: normal !important;
       letter-spacing: normal !important
   }
   .hero-section-font-2 {
       font-size: 36px !important;
       line-height: normal !important;
       letter-spacing: normal !important
   }
   .res-font-white {
       color: #FFFFFF !important;
   }
   .full-width-img img {
       width: 100%;
       height: auto;
   }
   .resp-remove-bg {
       background: #333333 !important;
   }
   .background-img {
       background-image: none !important;
   }
   .background-cover {
       background-size: cover !important;
   }
   .block-with-height {
       display: inline-block;
       width: 100%;
   }
   .inline-block {
       display: inline-block;
   }
   .left-right-pad {
       padding-left: 10px !important;
       padding-right: 10px !important;
   }
   .padding-zero {
       padding: 0px 0px 0px 0px !important;
   }
   
   .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; width: auto!important; }
   table.center-on-narrow { display: inline-block !important; }
   }
   </style>
   
   <style type="text/css">
   @media only screen and (max-width: 420px) {
   .menu {
       font-size: 12px !important;
   }
   .display-block-mob {
       display: block !important;
       height: auto !important;
       margin: 0 auto !important;
       width: 100% !important;
   }
   
   .resp-menu {
       font-size: 10px !important;
       font-weight: bold !important;
   }
   .side-border {
       border: 1px solid #5a5a5a !important;
       border-left: 0px !important;
       border-right: 0px !important;
   }
   }
   </style>
   </head>
   <body style="margin:0px; padding:0px; background: #351a57 !important;">
   <!-- Section-0 (2-col-Text) -->
   <table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
       <tbody>
           <tr>
               <td width="100%" align="center" valign="top">
                   <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                       <tbody>
                           
                           <tr>
                               <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                           </tr>											
   
                           <tr>
                               <td width="100%" align="center" valign="middle">
                                   <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                       <tbody>
                                           <tr>
                                               <td class="display-block" width="280" align="center" valign="top">
                                                   <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                       <tbody>
   
                                                            <tr>
                                                                <td class="text-center display-block" width="180" valign="top" align="left" style="line-height:1px;">
                                                                   <a href="https://www.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="text-decoration: none;">
                                                                       <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/be9f6854-34cb-48f4-add5-f94d61b5b4f9/289x101.png" border="0" width="180" height="auto" alt="img" style="display:block;">
                                                                   </a>
                                                                </td>
                                                            </tr>
                                                           
                                                       </tbody>
                                                   </table>
                                               </td>
   
                                               <td class="display-block padding" width="40" style="line-height:1px;"></td>
   
                                               <td class="display-block" width="280" align="center" valign="middle">
                                                   <table align="center" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse;">
                                                       <tbody>
                                                            
                                                            <tr>
                                                               <td class="text-center" width="100%" align="right" valign="middle" style="margin:0px;padding:0px;color: #FFFFFF;font-family: 'Poppins',sans-serif;font-size:16px;line-height: 24px;font-weight: 400;">
                                                                   <a href="https://www.lunaspin.app/articles/?utm_source=app&utm_medium=email&utm_campaign=header" target="_blank" style="color: #FFFFFF;text-decoration: none;">News & Stories</a>
                                                               </td>
                                                           </tr>	
                                                           
                                                       </tbody>
                                                   </table>
                                               </td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </td>
                           </tr>
   
   
                           <tr>
                               <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                           </tr>
   
                       </tbody>
                   </table>
               </td>
           </tr>
       </tbody>
   </table>
   <!-- End-Section-0 (2-col-Text) -->
   
   <!-- Section-0 (Fluid-Banner) -->
   <table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" width="700" style="border-collapse:collapse;border-top-left-radius: 15px; border-top-right-radius: 15px;">
       <tbody>
           <tr>
               <td width="100%" align="center" valign="top">
                   <table class="width_100percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse:collapse;">
                       <tbody>
                           <tr>
                               <td class="display-block" width="700" valign="middle" align="center" style="line-height:1px;">
                                   <img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/fd1626c2-3592-4e58-8dc0-696b34a3e425/1200x200.jpg" border="0" width="700" height="auto" alt="" style="display:block;border-top-left-radius: 15px; border-top-right-radius: 15px;">
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </td>
           </tr>
       </tbody>
   </table>
   <!-- End-Section-0 (Fluid-Banner) -->
   
   <!-- Section-0 (Text-Content) -->
   <table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" bgcolor="#ffffff">
       <tbody>
           <tr>
               <td width="100%" align="center" valign="middle">
                   <div style="margin:0 auto">
                       <table class="width_90percent" align="center" border="0" cellpadding="0" width="600" cellspacing="0" style="border-collapse: collapse;">
                           <tbody>
                               <tr>
                                   <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
                               <tr>
                                   <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size:36px; line-height: 46px; font-weight: 600; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                       Request to close your account
                                   </td>
                               </tr>
                               
                               <tr>
                                   <td width="100%" height="10" style="line-height:1px;"></td>
                               </tr>
                               
                               <tr>
                                   <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                       Your account closure request has been submitted.
                                   </td>
                               </tr>	
                               
                               <tr>
                                   <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
   
                               <tr>
                                   <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#11273b;font-size: 16px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                       Closure requests may take up to 48 hours to process. You'll receive an confirmation email once this has been complete.
                                   </td>
                               </tr>
   
                               <tr>
                                   <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
                               <tr>
                                   <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#50606f;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                       If you didn't request an account closure, <a href="https://www.lunaspin.app/contact/?utm_source=app&utm_medium=email&utm_campaign=account_preclosure" style="color:#5B88E8; text-decoration: underline;">contact our support team</a> immediately!
                                   </td>
                               </tr>
                               
                               <tr>
                                   <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
                               <tr>
                                   <td width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#000000;font-family: 'Poppins', sans-serif; font-size:24px; line-height: 30px; font-weight:600;">
                                       Keep going!<br>
                                       <span style="font-size: 18px; font-weight: 500;">LunaSpin Team</span>
                                   </td>
                               </tr>
   
                               <tr>
                                   <td width="100%" height="30" style="line-height:1px;" class="display-block padding"></td>
                               </tr>    
   
                           </tbody>
                       </table>
                   </div>
               </td>
           </tr>
       </tbody>
   </table>
   <!-- Section-0 (Text-Content)  End-->
    
   <!-- Section-0 (Text-Content) -->
   <table class="width_100" align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse:collapse;" bgcolor="#351a57">
       <tbody>
           <tr>
               <td width="100%" align="center" valign="middle">
                   <div style="margin:0 auto">
                       <table class="width_90percent" align="center" border="0" cellpadding="0" width="700" cellspacing="0" style="border-collapse: collapse;">
                           <tbody>
                               <tr>
                                   <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
                               <!-- border bg -->
                               <tr>
                                   <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                   </td>
                               </tr>
                               <!-- End border bg -->
   
                               <tr>
                                   <td width="100%" height="10" style="line-height:1px;"></td>
                               </tr>
   
                               <tr>
                                   <td width="100%" valign="top" align="left" style="margin: 0px;padding: 0px;color:#d7cadd;font-size: 13px; line-height: 26px; font-weight: 400; font-family:'Poppins', sans-serif; text-transform: inherit;">
                                       You have received this email because you have an account with LunaSpin.app
                                   </td>
                               </tr>	
                               
                               <tr>
                                   <td width="100%" height="10" style="line-height:1px;"></td>
                               </tr>
   
                               <!-- border bg -->
                               <tr>
                                   <td width="100%" align="center" valign="middle" style="border-bottom: 1px solid #d7cadd; line-height: 1px;">
                                   </td>
                               </tr>
                               <!-- End border bg -->
   
                               <tr>
                                   <td width="100%" height="10" style="line-height:1px;"></td>
                               </tr>
   
                               <tr>
                                   <td width="100%" align="left" valign="top" style="margin:0;padding:10px 0px 0px 0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:18px; line-height: 24px; font-weight:600;">
                                       <a href="https://shop.lunaspin.app/?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Shop</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/contact?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Contact Us</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                       <a href="https://www.lunaspin.app/privacy?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Privacy Policy</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://www.lunaspin.app/terms?utm_source=app&utm_medium=email&utm_campaign=footer" target="_blank"><img src="http://cdn.mcauto-images-production.sendgrid.net/79fcc5d8494d7892/0ca954d6-0350-47d8-a945-c80e0654ef3c/50x50.png" border="0" width="25" height="25" alt="" style="display:inline;margin-bottom:-5px;"> Terms of Use</a>
                                   </td>
                               </tr>
                               
                               <tr>
                                   <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                               </tr> 
                               
                               <tr>
                                   <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:24px; line-height:30px; font-weight:700;">
                                       DISCOVER & INSPIRE AT <br>
                                       LUNASPIN.APP
                                   </td>
                               </tr>
   
                                                           
                               <tr>
                                   <td width="100%" height="20" style="line-height:1px;" class="display-block padding"></td>
                               </tr> 
   
                               <tr>
                                   <td class="text-center" width="100%" align="left" valign="top" style="margin:0px;padding:0px;color:#d7cadd;font-family: 'Poppins', sans-serif; font-size:13px; line-height:25px; font-weight:400;">
                                       ${new Date().getFullYear()} Drip Fed Ltd t/a LunaSpin App. All rights reserved
                                   </td>
                               </tr>
   
   
                               <tr>
                                   <td width="100%" height="40" style="line-height:1px;" class="display-block padding"></td>
                               </tr>
   
                           </tbody>
                       </table>
                   </div>
               </td>
           </tr>
       </tbody>
   </table>
   <!-- Section-0 (Text-Content)  End-->
   
   </body>
   </html>
     `,
  };
};

export const emailTemplate = {
  createAccount, // done
  resetPassword, // done
  updateCompletedWelcomeEmail, // done
  completeAccount, // done
  WelcomMessageForClubCreation, // done
  WelcomMessageForClassCreation, // done
  WelcomMessageForClassBooking, // done
  WelcomeMessageForWaitingList, // done
  MessageForCancellation, // done
  WelcomeMessageForAcceptSpeceASQue, //done
  RequestToCloseClub, // done
  AccountClosedNotificaiton, // done
};
