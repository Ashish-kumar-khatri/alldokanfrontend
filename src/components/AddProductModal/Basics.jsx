import React from 'react'
import {
    TextInput 
} from '@mantine/core';
import AddImage from './AddImage';

function Basics({
    data,
    changeHandler,
    uploadingImg,
    setUploadingImg
}) {
  return (
    <>
        <TextInput 
            name = "name"
            label = "Product Name"
            size = "md"
            onChange = {(e) => changeHandler({
                name : "name",
                value : e.target.value
            })}
            value = {data.name}
            required
        />
        {/* image upload area comes here */}
        <AddImage 
            changeHandler = {changeHandler}
            images = {data.images}
            uploadingImg = {uploadingImg}
            setUploadingImg = {setUploadingImg}
        />
    </>
  )
}

export default Basics