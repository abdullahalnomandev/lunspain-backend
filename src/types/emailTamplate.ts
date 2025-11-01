export type ICreateAccount = {
  email: string;
  verify_url: string;
};

export type IResetPassword = {
  email: string;
  otp: number;
};
