import React from 'react'
import {
    TextInput,
    Select
} from '@mantine/core';
import { Icon } from '@iconify/react';

const negotiables = [
    'fixed',
    'negotiable'
]

function Price({
    changeHandler,
    data
}) {
  return (
    <>
    {/* price section */}
     <div className="field flex">
        <TextInput 
            name = "price"
            label = "Price"
            size = "md"
            icon = "NPR"
            required
            onChange = {(e) => changeHandler({
                name : "price",
                value : e.target.value
            })}
            value = {data?.price}
        />
        <Select
            label="negotiable"
            placeholder="Pick one"
            data={negotiables.map(cond => ({
                value : cond,
                label : cond
            }))}
            size = "md"
            rightSection = {<Icon icon = "tabler:chevron-down" />}
            required
            onChange = {(value) => changeHandler({
                name : "negotiable",
                value : value
            })}
            value = {data?.negotiable}
        />
    </div>
</>
  )
}

export default Price