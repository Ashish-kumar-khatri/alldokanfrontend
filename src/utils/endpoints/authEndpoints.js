import baseURL from "./baseURL";

export const endpoints = {
    register : `${baseURL}/user/signup`,
    login : `${baseURL}/user/signin`,
    buyerForgotPassword : `${baseURL}/user/forgotPassword`
}