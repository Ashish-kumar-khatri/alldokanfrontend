import React,{
    useEffect,
    useState
} from 'react'
import {
    Avatar,
    Button,
    TextInput,
    Radio
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {Icon} from '@iconify/react';
import { endpoints } from '../../../utils/endpoints/otherEndpoints';
import { useAxios, useCloudinaryContext, useCreateNotification } from '../../../hooks';

function EditProfile({setShowForm,profile}) {

    const [localUser,setLocalUser] = useState(profile)
    const [data,setData] = useState(null)
    const [dataImage,setDataImage] = useState(null)
    const [avatarFile,setAvatarFile] = useState(null)
    const axiosInstance = useAxios();
    const {uploadToCloudinary} = useCloudinaryContext();
    const [submitting,setSubmitting] = useState(false);
    const {createNotification} = useCreateNotification();

    console.log('data = ',data)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data,avatarFile)
        if(!data && !avatarFile){
            createNotification({
                title : "profile update",
                type : "failure",
                timer : 5000,
                message : "no fields were updated",
                icon : "material-symbols:sms-failed"
            })
            return
        }
        // console.log('submmtting data = ',data)
        setSubmitting(true);
        // uploadToCloudinary({
        //     type : "profile",
        //     image : avatarFile
        // }) 
        //     .then(res => {
        //         console.log('res = ',res)
        //         data["avatar"] = res.secure_url;
        //         updateProfile(data)
        //             .then(res => {
        //                 console.log(res);
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        try{
            let res = await uploadToCloudinary({
                type : "profile",
                image : avatarFile
            }) 
            console.log('submitting = ',{...data,avatar : res.secure_url})
            // res = await updateProfile({...data,avatar : res.secure_url})
            // console.log('res = ',res);
        }catch(err){    
            console.log(err)
        }

        // temp lai
        // axiosInstance.put(`${endpoints.updateProfile}`,data)
        //     .then(res => {
        //         console.log("res = ",res);
        //     })
        //     .catch(err => {
        //         console.log('err = ',err);
        //     })
    }

    const changeHandler = (e) => {
        setLocalUser(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
        setData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const changeAvatar = (e) => {
        console.log('changed avatar to ',e.target.files[0])
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
          console.log('result', reader.result)
          setDataImage(reader.result)
          setAvatarFile(file)
        }
        reader.readAsDataURL(file);
    }

    return (
    <div className="editprofile-container bordered">
        <div className="header">
            <h3>Edit Profile</h3>
            <button 
                className="closeBtn"
                onClick = {() => setShowForm(false)}
            >
                <Icon icon = "maki:cross" />
            </button>
        </div>
        <form 
            action=""
            onSubmit={submitHandler}
        >
            <div className="field avatar">
                {
                    !dataImage ?
                        <Avatar 
                            size = {150} 
                            radius = {10}
                            src={localUser?.avatar}
                        />:
                        <Avatar 
                            size = {150}
                            radius = {10}
                            src = {dataImage}
                        />
                }
                <label
                    htmlFor = "avatarinput"
                    className='avatarchangeicon'
                >
                    {/* <button 
                        className="changeAvatarBtn"
                    > */}
                    <Icon icon = "ic:outline-change-circle" />
                    {/* </button> */}
                </label>
                <input type="file" id = "avatarinput" onChange = {changeAvatar} hidden />
            </div>
            <TextInput 
                name = "person_name"
                label = "Full name"
                value = {localUser?.person_name}
                onChange = {changeHandler}
            />
            <TextInput 
                name = "email"
                label = "Email"
                value = {localUser?.email}
                onChange = {changeHandler}
            />
            <DatePicker 
                placeholder='pick a date'
                name = "date_of_birth"
                value = {localUser?.date_of_birth ? new Date(profile?.date_of_birth) : ""}
                label = "date of birth"
                onChange = {(value) => setData(prev => ({
                    ...prev,
                    date_of_birth : value
                }))}
            />
            <TextInput 
                name = "phone_number"
                label = "Phone number"
                value = {localUser?.phone_number}
                onChange = {changeHandler}
            />
             <Radio.Group 
              label = "Gender"
              size = "md"
              value = {localUser?.gender}
              name = "gender"
              onChange = {(value) => {
                setLocalUser(prev => ({
                    ...prev,
                    gender : value
                }))
                setData(prev => ({
                    ...prev,
                    gender : value
                }))
              }}
            >
              <Radio value="MALE" label = "male" />
              <Radio value="FEMALE" label = "female" />
            </Radio.Group>
            <Button
                type = "submit"
                loading = {submitting}
            >
                {
                    !submitting ?
                        "update profile":
                        "updating profile"
                }
            </Button>
        </form>
    </div>
    )
}

export default EditProfile