import React,{
    useState
} from "react";

export const GlobalContext = React.createContext();

const GlobalContextProvider = ({children}) => {

    const [mobileShowSideCategories,setMobileShowSideCategories] = useState(false);

    const value = {
        mobileShowSideCategories,
        setMobileShowSideCategories
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