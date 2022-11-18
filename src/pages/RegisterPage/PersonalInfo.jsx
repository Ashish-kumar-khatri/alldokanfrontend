import React from 'react'
import {
  TextInput,
  PasswordInput,
  Radio
} from '@mantine/core';

import {
  DatePicker
} from '@mantine/dates';

function PersonalInfo({data,onChange,errors}) {

  const changeHandler = (e) => {
    onChange({
      name : e.target.name,
      value : e.target.value
    })
  }

  return (
      <>
            <TextInput 
                label = "full name"
                name = "name"
                size = "md"
                value = {data?.name}
                onChange = {changeHandler}
                error = {errors?.name}
            />
            <DatePicker 
              label = "date of birth"
              size = "md"
              name = "dateofbirth"
              value = {data?.dateofbirth}
              onChange = {(value) => onChange({
                name : "dateofbirth",
                value : value
              })}
              error = {errors?.dateofbirth}
            />
            <Radio.Group 
              label = "Gender"
              size = "md"
              value = {data?.gender}
              name = "gender"
              onChange = {(value) => onChange({
                name : "gender",
                value : value
              })}
            >
              <Radio value="male" label = "male" />
              <Radio value="female" label = "female" />
            </Radio.Group>
            <TextInput 
              label = "phone number"
              size = "md"
              name = "phonenumber"
              value = {data?.phonenumber}
              onChange={changeHandler}
              error = {errors?.phonenumber}
            />
            
      </>
  )
}

export default PersonalInfo