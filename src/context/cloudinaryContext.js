import axios from 'axios';
import React from 'react';

import {endpoints} from '../utils/endpoints/cloudinary';

export const cloudinaryContext = React.createContext();

export const CloudinaryContextProvider = ({children}) => {

    const uploadToCloudinary = (image) => {
        return new Promise(async (resolve,reject) => {
            try{
                console.log('inside uploadToCLoudinfay promise')
                let form_data = new FormData();
                form_data.append('file',image);
                form_data.append('upload_preset','testunsignedpreset');
                const res = await axios.post(`${endpoints.upload}`,form_data);
                return resolve(res.data)
            }catch(err){
                return reject('error occured',err);
            }
        })
    }

    const value = {
        uploadToCloudinary : uploadToCloudinary
    }

    return(
        <cloudinaryContext.Provider
            value = {value}
        >
            {children}
        </cloudinaryContext.Provider>
    )
}

