import React, { useState } from "react";
import jwt_decode from 'jwt-decode';
import { endpoints } from "../utils/endpoints/authEndpoints";
import {
    useAxios
} from '../hooks/';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)

    const [user,setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)

    const axiosInstance = useAxios();

    const register = async (data) => {
        return new Promise((resolve,reject) => {
            axiosInstance.post(`${endpoints.register}`,data)
                .then(res => {
                    console.log('res = ',res);
                    setToken(res?.data.token);
                    localStorage.setItem('token',res?.data.token);
                    localStorage.setItem('user',JSON.stringify(res?.data.buyer))
                    setUser(res?.data.buyer);
                    return resolve('success');
                })
                .catch(err => {
                    return reject(err);
                })
        })
    }

    const login = async (data) => {
        return new Promise((resolve,reject) => {
            axiosInstance.post(`${endpoints.login}`,data)
                .then(res => {
                    console.log('res = ',res);
                    setToken(res?.data.token);
                    localStorage.setItem('token',res?.data.token);
                    localStorage.setItem('user',JSON.stringify(res?.data.buyer));
                    setUser(res?.data.buyer);
                    return resolve('success');
                })
                .catch(err => {
                    return reject(err);
                })
        })
    }

    const logout = async (data) => {
        return new Promise((resolve,reject) => {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return resolve('logged out successfully')
        })
    }


    let value = {
        user : user,
        register : register,
        login : login,
        logout : logout,
        name  : "ashish"
    }


    return <AuthContext.Provider 
        value = {value}
    >
        {children}
    </AuthContext.Provider>
}