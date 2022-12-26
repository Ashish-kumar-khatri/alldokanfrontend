import { Modal,RingProgress,Text,Button, TextInput,Select,Switch,Textarea } from '@mantine/core'
import { useWindowSize } from '@react-hook/window-size';
import React from 'react'
import { useGlobalContext } from '../../hooks'
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
        delivery : false,
        location : "",
        city : "",
        state : "",
        area : "",
        category : "",
        note : "",
        price : "",
        discount_percentage : "",
        tags : "",
        images : [],
        delivery_charge : "",
        delivery_area : ""
    })
    
    const [width] = useWindowSize();
    const {showAddProductModal,setShowAddProductModal,localCategories} = useGlobalContext();
    const totalSteps = 5;
    const [step,setStep] = useState(1);

    const [deliveryAvailable,setDeliveryAvailable] = useState(false);

    const changeHandler = ({name,value}) => {
        setData(prev => ({
            ...prev,
            [name] : value
        }))
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
        if(step == totalSteps){
            console.log('submitted',data);
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