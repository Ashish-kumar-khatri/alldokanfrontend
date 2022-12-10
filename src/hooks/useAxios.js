import useAuthContext from './useAuthContext';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchBaseURL from '../utils/endpoints/baseURL';

function useAxios() {

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

  const baseURL = fetchBaseURL();

  const axiosInstance = axios.create({
    baseURL,
    // headers : {
    //     Authorization : `Bearer ${token}`
    // }
  });

  axiosInstance.interceptors.request.use((req) => {
    console.log('inside axiosInstance');
    if(token){
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  return axiosInstance;
}

export default useAxios;
