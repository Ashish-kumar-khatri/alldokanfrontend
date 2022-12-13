import useAuthContext from './useAuthContext';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../utils/endpoints/baseURL';
import { useEffect } from 'react';

function useAxios() {
  
  const {token} = useAuthContext();

  useEffect(() => {
    console.log('inside useAxios')
  },[])

  const axiosInstance = axios.create({
    baseURL,
    // headers : {
    //     Authorization : `Bearer ${token}`
    // }
  });
  
  // axiosInstance.interceptors.request.use((req) => {
  //   // console.log('inside axiosInstance');
  //   // if(token){
  //   //   console.log('got token so added bearer')
  //   //   req.headers.Authorization = `Bearer ${token}`;
  //   // }
  //   // return req;
  // });

  return axiosInstance;
}

export default useAxios;
