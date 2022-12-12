import fetchBaseURL from './baseURL';

const baseURL = fetchBaseURL();

export const endpoints = {
  register: `${baseURL}/user/signup`,
  login: `${baseURL}/user/signin`,
  forgotPassword: `${baseURL}/user/forgotPassword`,
  resetPassword: `${baseURL}/user/resetPassword`,
};
