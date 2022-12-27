import React from 'react'
import {
    TextInput,
    Switch,
    Select
} from '@mantine/core';

import { Icon } from '@iconify/react';

const deliveries = [
    'within my area',
    'within my city',
    'anywhere'
]

function Location({
    changeHandler,
    data
}) {

    return (
        <>
            {/* <TextInput 
                name = "location"
                label = "Location"
                size = "md"
                rightSection = {<Icon icon = "material-symbols:my-location-outline" onClick = {() => console.log('clicked')} />}
                placeholder = "eg. Rupandehi,Lumbini,Butwal-13,Nayagaun"
                required
                onChange = {(e) => changeHandler({
                    name : "location",
                    value : e.target.value
                })}
                value = {data?.location}
            /> */}
            <div className = "field flex-3">
                <TextInput 
                    name = "state"
                    label = "State"
                    size = "md"
                    required
                    onChange = {(e) => changeHandler({
                        name : "state",
                        value : e.target.value
                    })}
                    value = {data?.state}
                />
                <TextInput 
                    name = "city"
                    label = "city"
                    size = "md"
                    required
                    onChange = {(e) => changeHandler({
                        name : "city",
                        value : e.target.value
                    })}
                    value = {data?.city}
                />     
                <TextInput 
                    name = "area"
                    label = "area"
                    size = "md"
                    required
                    onChange = {(e) => changeHandler({
                        name : "area",
                        value : e.target.value
                    })}
                    value = {data?.area}
                />
            </div>            
            <Switch 
                labelPosition='left'
                label = "Delivery" 
                checked = {data?.delivery}
                onChange={(e) => {
                    console.log('changed',e.target.checked)
                    changeHandler({
                        name : 'delivery',
                        value : e.target.checked
                    })
                }}
                size = "md"
                name = "delivery"
            />
            {
                data?.delivery &&
                <div className = "field flex">
                    <Select
                        name = "delivery_area"
                        label="delivery area"
                        placeholder="Pick one"
                        data={deliveries.map(cond => ({
                            value : cond,
                            label : cond
                        }))}
                        size = "md"
                        rightSection = {<Icon icon = "tabler:chevron-down" />}
                        required
                        onChange = {(value) => changeHandler({
                            name : "delivery_area",
                            value : value
                        })}
                        value = {data?.delivery_area}
                    />
                    <TextInput 
                        name = "delivery_charge"
                        label = "Delivery Charge"
                        size = "md"
                        onChange = {(e) => changeHandler({
                            name : "delivery_charge",
                            value : e.target.value
                        })}
                        value = {data?.delivery_charge}
                        required
                    />
                </div>
            }
            
        </>
  )
}

export default Location