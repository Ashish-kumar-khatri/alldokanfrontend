import baseURL from "./baseURL";

export const endpoints = {
    register : `${baseURL}/buyer/signup`,
    login : `${baseURL}/buyer/signin`,
    buyerForgotPassword : `${baseURL}/buyer/forgotPassword`
}