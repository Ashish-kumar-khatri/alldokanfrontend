import { Modal,RingProgress,Text,Button, TextInput,Select,Switch,Textarea } from '@mantine/core'
import { useWindowSize } from '@react-hook/window-size';
import React from 'react'
import { useCreateNotification, useGlobalContext } from '../../hooks'
import { useState } from 'react';
import './style.css'
import { Icon } from '@iconify/react';
import Basics from './Basics';
import Product from './Product';
import KeyValueDescription from './KeyValueDescription';
import Location from './Location';
import Price from './Price';


function AddProductModal() {
    
    const [data,setData] = useState({
        name : "",
        negotiable : "",
        delivery : "off",
        city : "",
        state : "",
        area : "",
        category : "",
        note : "",
        price : "",
        tags : "",
        images : [],
        delivery_charge : "",
        delivery_area : "",
        specifications : ""
    })
    const [uploadingImg,setUploadingImg] = useState(false);
    
    const [width] = useWindowSize();
    const {showAddProductModal,setShowAddProductModal,localCategories,addProduct} = useGlobalContext();
    const totalSteps = 5;
    const [step,setStep] = useState(1);

    const [deliveryAvailable,setDeliveryAvailable] = useState(false);
    const {createNotification} = useCreateNotification();

    const changeHandler = ({name,value,imgUrl,type}) => {
        if(name != "images"){
            setData(prev => ({
                ...prev,
                [name] : value
            }))
            if(name == "delivery" && !value){
                setData(prev => ({
                    ...prev,
                    delivery_area : "",
                    delivery_charge : ""
                }))
            }
        }else{
            switch(type){
                case "add":
                    setData(prev => ({
                        ...prev,
                        images : [
                            ...prev['images'],
                            imgUrl
                        ]
                    }))
                    break;
                
                case "remove":
                    setData(prev => ({
                        ...prev,
                        images : prev['images'].filter(img => img !== imgUrl)
                    }))
                    break;
            }
        }
    }

    const goPrev = () => {
        if(step == 1) return;
        setStep(prev => prev - 1);
    }

    const goNext = () => {
        if(step == totalSteps) return;
        setStep(prev => prev + 1);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(step == 1){
            if(data.images.length == 0){
                createNotification({
                    title : "next of form",
                    type : "failure",
                    timer : 5000,
                    message : "at least one image is required",
                    icon : "clarity:success-standard-solid"
                })
                return;
            }
        }
        if(step == totalSteps){
            console.log('submitted',data);
            let toSubmitData = {...data};
            toSubmitData.specifications = {};
            // constructing specification object
            let specifications = ((data.specifications.split(',')).join('')).split('\n')
            specifications.forEach(spec => {
                let temp = spec.split(':')
                toSubmitData.specifications[temp[0]] = temp[1];
            })
            // removing delivery fields when delivery is off
            if(!data.delivery){
                delete toSubmitData.delivery_area;
                delete toSubmitData.delivery_charge;
            }
            delete Object.assign(toSubmitData,{product_images : toSubmitData.images})['images'];
            console.log('submitting',toSubmitData)
            addProduct(toSubmitData)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                })
        }else{
            goNext();
        }
    }

    return (
        <Modal
            opened = {showAddProductModal} 
            onClose = {() => setShowAddProductModal(false)}
            fullScreen = {width < 600 ? true : false}
            size = {700}
            radius = {8}
            className = "addproduct-container-wrapper"
        >
            <div className = "addproduct-container">
                <h3 className = "title">Add Product</h3>
                {/* <RingProgress
                    sections={[{ value: step * 25, color: 'blue' }]}
                    label={
                    <Text color="blue" weight={700} align="center" size="xl">
                        40%
                    </Text>
                    }
                    style = {{
                        transition : "all 200ms ease"
                    }}
                />
                <Button
                    onClick = {() => {
                        setStep(prev => prev + 1)
                    }}
                >
                    click me
                </Button> */}
                    <form 
                        action=""
                        onSubmit={submitHandler}
                    >
                        {/* first step */}
                        {
                            step == 1 &&
                               <Basics 
                                    changeHandler = {changeHandler}
                                    data = {data}
                                    uploadingImg = {uploadingImg}
                                    setUploadingImg = {setUploadingImg}
                               />
                        }
                        {
                            step == 2 &&
                                <Product 
                                    changeHandler = {changeHandler}
                                    data = {data}
                                />
                        }
                        {
                            step == 3 &&
                            <KeyValueDescription 
                                changeHandler={changeHandler}
                                data = {data}
                                />
                        }
                        {
                            step == 4 &&
                                <Location 
                                    changeHandler = {changeHandler}
                                    data = {data}
                                />
                        }

                        {
                            step == 5 &&
                               <Price 
                                    changeHandler={changeHandler}
                                    data = {data}
                                />
                        }
                        <div 
                            className = {`${step != 1 ? "field flex" : ""} buttons`}
                        >
                            {
                                step !== 1 &&
                                    <Button
                                        leftIcon = {<Icon icon = "ph:arrow-left-duotone" />}
                                        size = "md"
                                        variant = "outline"
                                        onClick = {goPrev}
                                    >
                                        Prev
                                    </Button>
                            }
                            <Button
                                size = "md"
                                type = "submit"
                                fullWidth
                                className = {`${uploadingImg ? "disabled" : ""}`}
                            >
                                {
                                    step !== totalSteps ?
                                        "next":
                                        "Post"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
        </Modal>
    )
}

export default AddProductModal