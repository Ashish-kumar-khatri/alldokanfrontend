import React from 'react'

import {
    PasswordInput,
    TextInput
} from '@mantine/core'

function AccountInfo({data,errors,onChange}) {

    const changeHandler = (e) => {
        onChange({
            name : e.target.name,
            value : e.target.value.trim()
        })
    }
    
    return (
        <>
            <TextInput 
                label = "email"
                name = "email"
                size = "md"
                value = {data?.email}
                error = {errors?.email}
                onChange = {changeHandler}
                autoFocus = {true}
            />
            <PasswordInput
                label = "password"
                name = "password"
                className='password'
                size = "md"
                value = {data?.password}
                onChange = {changeHandler}
                error = {errors?.password}
            />
            <PasswordInput
                label = "repeat password"
                name = "repeat_password"
                className='password'
                size = "md"
                value = {data?.repeat_password}
                onChange = {changeHandler}
                error = {errors?.repeat_password}
            />
        </>
    )
}

export default AccountInfo

// const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log('form submitted',data);
    // save to cloudinary
//     try{	
//         setUploadingImg(true);
//         let res = await uploadToCloudinary({
//             image : data.avatar,
//             type : "profile",
//         });
//         console.log('uploaded to cloudinary',res);
//         setData(prev => ({
//             ...prev,
//             avatar : res.secure_url
//         }));
//         setUploadingImg(false);
//         setSubmitting(true);
//         setTimeout(() => setSubmitting(false),5000);
//     }catch(err){
//         setUploadingImg(false);
//         setSubmitting(false);
//         console.log(err);
//     }
// }