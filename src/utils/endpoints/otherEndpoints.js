import fetchBaseURL from './baseURL';

const baseURL = fetchBaseURL();

export const endpoints = {
  sellerRegister : `${baseURL}/user/becomeSeller`,
  otpVerify : `${baseURL}/otp/verify-user`,
  resendOtp : `${baseURL}/otp/resend-verification`
};
