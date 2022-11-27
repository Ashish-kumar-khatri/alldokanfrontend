import baseURL from "./baseURL";

export const endpoints = {
    register : `${baseURL}/user/signup`,
    login : `${baseURL}/user/signin`,
    forgotPassword : `${baseURL}/user/forgotPassword`,
    resetPassword : `${baseURL}/user/resetPassword`

}