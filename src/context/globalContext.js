import React,{
    useState
} from "react";
import { useAxios } from "../hooks";
import { endpoints } from "../utils/endpoints/otherEndpoints";
import axios from "axios";

export const GlobalContext = React.createContext();


const GlobalContextProvider = ({children}) => {

    const [mobileShowSideCategories,setMobileShowSideCategories] = useState(false);

    const [imagePopupVisible,setImagePopupVisible] = useState(false);

    const axiosInstance = useAxios();

    // later add these function in its own context
    async function sellerRegistration(data){
        return await axiosInstance.put(`${endpoints.sellerRegister}`,data);
    }

    async function verifyOtp(otp){
        return await axiosInstance.post(`${endpoints.otpVerify}`,{
            email : otp.email,
            pin: otp.pin
        });
    }

    async function sendOtp(email){
        return await axiosInstance.post(`${endpoints.sendOtp}`,{
            email : email
        });
    }

    async function getProfile(email){
        return await axiosInstance.get(`${endpoints.getProfile}`);
    }

    async function fetchAllCategories(){
        return await axios.get(`${endpoints.fetchAllCategories}`);
    }

    async function profileUpdate(data){
        return await axiosInstance.patch(`${endpoints.profileUpdate}`,data);
    }

    const toggleImagePopup = ({image}) => {
        console.log('image popup toggled')
        if(image) value["imageInPopup"] = image;
        setImagePopupVisible(prev => !prev);
    }

    let value = {
        mobileShowSideCategories,
        setMobileShowSideCategories,
        sellerRegistration,
        verifyOtp,
        sendOtp,
        getProfile,
        fetchAllCategories,
        profileUpdate,
        toggleImagePopup,
        imagePopupVisible,
        imageInPopup : null,
        setImagePopupVisible
    }
    
    return(
        <GlobalContext.Provider
            value = {value}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;