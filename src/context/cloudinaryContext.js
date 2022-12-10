import axios from 'axios';
import React from 'react';

import {endpoints} from '../utils/endpoints/cloudinary';

export const cloudinaryContext = React.createContext();

export const CloudinaryContextProvider = ({children}) => {

    const uploadToCloudinary = (data) => {
        return new Promise(async (resolve,reject) => {
            try{
                console.log('inside uploadToCLoudinfay promise',data)
                let form_data = new FormData();
                form_data.append('file',data.image);
                form_data.append('upload_preset','alldokan');
                const res = await axios.post(`${endpoints['temp']}`,form_data);
                console.log('docname = ',data.doc_name)
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

