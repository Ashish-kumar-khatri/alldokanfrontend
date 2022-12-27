import baseURL from './baseURL';

export const endpoints = {
  sellerRegister : `${baseURL}/user/become-seller`,
  otpVerify : `${baseURL}/otp/verify-user`,
  sendOtp : `${baseURL}/otp/resend-verification`,
  getProfile : `${baseURL}/user/profile`,
  updateProfile : `${baseURL}/`,
  fetchAllCategories : `${baseURL}/category/all`,
  profileUpdate : `${baseURL}/user/update-profile`,
  addProduct : `${baseURL}/product`,
  getProduct : `${baseURL}/product`
};
