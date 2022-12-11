import fetchBaseURL from './baseURL';

const baseURL = fetchBaseURL();

export const endpoints = {
  sellerRegister : `${baseURL}/user/becomeSeller`,
  otpVerify : `${baseURL}/otp/verify-user`,
  sendOtp : `${baseURL}/otp/resend-verification`,
  getProfile : `${baseURL}/user/profile`,
  updateProfile : `${baseURL}/`
};
