import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { endpoints } from '../utils/endpoints/authEndpoints';
import { useAxios,useCreateNotification } from '../hooks/';
import { Icon } from '@iconify/react';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );

  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );
  
  console.log('inside auth context')
  // const axiosInstance = useAxios();
  const {createToast} = useCreateNotification();
  
  const register = async (data) => {
    // return new Promise((resolve, reject) => {
    //   axiosInstance
    //     .post(`${endpoints.register}`, data)
    //     .then((res) => {
    //       console.log('res = ', res);
    //       Object.keys(res?.data).forEach(key => {
    //         localStorage.setItem(key,res?.data[key])
    //       })
    //       // setToken(res?.data.token);
    //       // localStorage.setItem('token', res?.data.token);
    //       // localStorage.setItem('user', JSON.stringify(res?.data.user));
    //       // setUser(res?.data.user);
    //       return resolve('success');
    //     })
    //     .catch((err) => {
    //       return reject(err);
    //     });
    // });
  };

  const login = async (data) => {
    // return new Promise((resolve, reject) => {
    //   axiosInstance
    //     .post(`${endpoints.login}`, data)
    //     .then((res) => {
    //       console.log('res = ', res);
    //       setToken(res?.data.token);
    //       localStorage.setItem('token', res?.data.token);
    //       localStorage.setItem('user', JSON.stringify(res?.data.user));
    //       setUser(res?.data.user);
    //       return resolve('success');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return reject(err);
    //     });
    // });
  };
  
  const logout = async (data) => {
    // return new Promise((resolve, reject) => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      createToast({
        type : "success",
        icon : <Icon icon = "mdi:tick-circle" />,
        message : 'logged out successfully'
      });
      // return resolve('logged out successfully');
    // });
  };

  let value = {
    token: token,
    user: user,
    register: register,
    login: login,
    logout: logout,
  };

  useEffect(() => {
    value.user = user;
    value.token = token;
  },[user,token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
