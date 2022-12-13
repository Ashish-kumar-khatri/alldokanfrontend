import React, { useEffect } from "react";
import {cloudinaryContext} from '../context/cloudinaryContext';

export const useCloudinaryContext = () => {

    useEffect(() => {
        console.log('inside useCloudinaryContext')
    },[])

    return React.useContext(cloudinaryContext);
}