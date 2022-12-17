import baseURL from './baseURL';

export const endpoints = {
  sellerRegister : `${baseURL}/user/becomeSeller`,
  otpVerify : `${baseURL}/otp/verify-user`,
  sendOtp : `${baseURL}/otp/resend-verification`,
  getProfile : `${baseURL}/user/profile`,
  updateProfile : `${baseURL}/`,
  fetchAllCategories : `${baseURL}/category/all`,
  profileUpdate : `${baseURL}/user/update-profile`
};
