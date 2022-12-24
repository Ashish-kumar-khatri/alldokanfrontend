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
import { useAxios, useCloudinaryContext, useCreateNotification, useGlobalContext } from '../../../hooks';

const editableFields = [
    'person_name',
    'phone_number',
    'date_of_birth',
    'gender',
    'avatar'
]

const emptyObject = () => {
    let temp = {};
    editableFields.forEach(field => {
        temp[field] = ""
    })
    return temp;
}

function EditProfile({setShowForm,profile,setRefetchProfile}) {
    const [data,setData] = useState(emptyObject())
    const [dataImage,setDataImage] = useState(null)
    const [avatarFile,setAvatarFile] = useState(null)
    const axiosInstance = useAxios();
    const {uploadToCloudinary} = useCloudinaryContext();
    const [submitting,setSubmitting] = useState(false);
    const [changedAvatar,setChangedAvatar] = useState(true);
    const {createNotification} = useCreateNotification();

    const {profileUpdate} = useGlobalContext();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data)
        console.log('submmtting data = ',data,avatarFile)
        setSubmitting(true);
        
        try{
            let res;
            if(avatarFile){
                res = await uploadToCloudinary({
                    image : avatarFile
                });
                console.log('uploaded to cloudinary',res);
            }
            console.log('now updating profile')
            res = await profileUpdate(data);
            console.log('res = ',res)
            createNotification({
                title : "profile update",
                type : "success",
                timer : 5000,
                message : res.data.message,
                icon : "material-symbols:sms-failed"
            })
            setSubmitting(false);
            setShowForm(false);
            setRefetchProfile(true);
        }catch(err){
            console.log('error occured',err);
            setSubmitting(false);
            createNotification({
                title : "profile update",
                type : "failure",
                timer : 5000,
                message : err.response.data.message,
                icon : "material-symbols:sms-failed"
            })
        }
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

    useEffect(() => {
        setData(prev => {
            let data = {};
            Object.keys(profile).forEach(key => {
                if(editableFields.includes(key)){
                    if(key == "phone_number"){
                        data[key] = profile[key].toString();
                        return;
                    }
                    data[key] = profile[key];
                }
            })
            setData(prev => data);
        })
    },[profile])

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
                                src={data?.avatar}
                            />:
                            <Avatar 
                                size = {150}
                                radius = {10}
                                src = {dataImage}
                            />
                    }
                   <div className="avatar-action-buttons">
                        <label
                            htmlFor = "avatarinput"
                            className='avatarchangeicon'
                            style = {{
                                cursor : "pointer"
                            }}
                        >
                            <Button 
                                className="changeAvatarBtn"
                                leftIcon = {<Icon icon = "ic:outline-change-circle" />}
                                style = {{
                                    pointerEvents : "none",
                                    bottom : "0"
                                }}
                            >
                                change avatar
                            </Button>
                        </label>
                        <input type="file" id = "avatarinput" onChange = {changeAvatar} hidden />
                        {
                            avatarFile &&
                            <Button 
                                style = {{
                                    bottom : "0"
                                }}
                                className="resetAvatarBtn"
                                leftIcon = {<Icon icon = "ic:outline-change-circle" />}
                                onClick = {() => {
                                    setDataImage(null);
                                    setAvatarFile(null);
                                    setData(prev => ({
                                        ...prev,
                                        avatar : profile.avatar
                                    }))
                                }}
                            >
                                Reset avatar
                            </Button>
                        }
                   </div>
                    
                </div>
                <TextInput 
                    name = "person_name"
                    label = "Full name"
                    value = {data?.person_name}
                    onChange = {changeHandler}
                />
                <DatePicker 
                    placeholder='pick a date'
                    name = "date_of_birth"
                    value = { data?.date_of_birth ? new Date(data?.date_of_birth) : ""}
                    label = "date of birth"
                    onChange = {(value) => setData(prev => ({
                        ...prev,
                        date_of_birth : value
                    }))}
                />
                <TextInput 
                    name = "phone_number"
                    label = "Phone number"
                    value = {data?.phone_number}
                    onChange = {changeHandler}
                />
                <Radio.Group 
                    label = "Gender"
                    size = "md"
                    value = {data?.gender}
                    name = "gender"
                    onChange = {(value) => {
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