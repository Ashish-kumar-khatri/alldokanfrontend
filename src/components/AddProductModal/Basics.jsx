import React from 'react'
import {
    TextInput 
} from '@mantine/core';

function Basics({
    data,
    changeHandler
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
        image upload section will come here
    </>
  )
}

export default Basics