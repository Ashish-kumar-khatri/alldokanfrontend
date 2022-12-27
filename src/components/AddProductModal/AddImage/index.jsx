import { Button, FileInput,Image } from '@mantine/core';
import React,{
  useState,
  useRef
} from 'react'
import './style.css';
import { Icon } from '@iconify/react';
import { useAuthContext, useCloudinaryContext, useCreateNotification } from '../../../hooks';

function AddImage({
  changeHandler,
  images,
  uploadingImg,
  setUploadingImg
}) {

  const inputref = useRef(null);
  const {user} = useAuthContext();

  const {uploadToCloudinary} = useCloudinaryContext();
  const {createNotification} = useCreateNotification();

  const inputChangeHandler = (e) => {
    console.log('images = ',e.target.files)
    // addImageHandler(e);
    if(Array.from(e.target.files).length > 3 && user.account_type !== "PREMIUM"){
      createNotification({
          title : "adding image",
          type : "failure",
          timer : 5000,
          message : "you cannot add more than three images. To add more than three images, upgrade your account to premium",
          icon : "clarity:success-standard-solid"
      })
      return;
    }
    Array.from(e.target.files).forEach(file => addImageHandler(file));
  }

  const addImageHandler = (file) => {
    console.log('adding imahge');
    setUploadingImg(true);
    uploadToCloudinary({
      image : file,
      doc_name : "product"
    }).then(res => {
      console.log('res = ',res);
      changeHandler({
        name : "images",
        type : "add",
        imgUrl : res?.secure_url
      })
      setUploadingImg(false);
    })
   
  }

  const removeImageHandler = (e) => {
    e.stopPropagation();
    changeHandler({
      name : "images",
      type : "remove",
      imgUrl : e.target.getAttribute('imgUrl')
    })
  }

  return (
    <div className='addimage-container'>
        <label >
            Product Images
        </label>
        <div className="images-area">
            <input 
              ref = {inputref} 
              onChange = {inputChangeHandler} 
              id = "product-input" 
              type="file" 
              accept = "image/png,image/jpg" 
              multiple
              hidden
            />
            {
              images.map(img => (
                <div className='img-container'>
                    <Image 
                      src = {img} 
                      height = {150}
                      width = {150}
                    />
                    <div imgUrl = {img} className="remove-icon" onClick = {removeImageHandler}>
                      <Icon icon = "charm:circle-cross" />
                    </div>
                </div>
              ))
            }
            
            <div className = {
              `${uploadingImg ? "disabled" : ""} addimage-button`
            }>
              <button
                  type = "button"
                  onClick = {() => inputref.current.click()}
              >
                  <Icon icon = "material-symbols:add-box-outline" />
                  Choose an image
                </button>
            </div>
        </div>
        {
            uploadingImg &&
            <div className = "loading">
              <Icon icon = "line-md:loading-twotone-loop" />
            </div>
          }
    </div>
  )
}

export default AddImage