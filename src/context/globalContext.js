import React,{
    useState
} from "react";
import { useAxios } from "../hooks";
import { endpoints } from "../utils/endpoints/otherEndpoints";

export const GlobalContext = React.createContext();


const GlobalContextProvider = ({children}) => {

    const [mobileShowSideCategories,setMobileShowSideCategories] = useState(false);

    const axiosInstance = useAxios();

    // later add these function in its own context
    async function sellerRegistration(data){
        return await axiosInstance.put(`${endpoints.sellerRegister}`,data);
    }

    async function verifyOtp(otp){
        return await axiosInstance.post(`${endpoints.otpVerify}`,{pin : otp});
    }

    async function resendOtp(otp){
        return await axiosInstance.post(`${endpoints.resendOtp}`);
    }

    const value = {
        mobileShowSideCategories,
        setMobileShowSideCategories,
        sellerRegistration,
        verifyOtp,
        resendOtp
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