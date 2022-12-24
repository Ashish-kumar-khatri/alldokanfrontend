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
                name = "person_name"
                size = "md"
                value = {data?.person_name}
                onChange = {changeHandler}
                error = {errors?.person_name}
                autoFocus = {true}
            />
            <DatePicker 
              label = "date of birth"
              size = "md"
              name = "date_of_birth"
              value = {data?.date_of_birth}
              onChange = {(value) => onChange({
                name : "date_of_birth",
                value : value
              })}
              error = {errors?.date_of_birth}
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
              <Radio value="MALE" label = "male" />
              <Radio value="FEMALE" label = "female" />
            </Radio.Group>
            <TextInput 
              label = "phone number"
              size = "md"
              name = "phone_number"
              value = {data?.phone_number}
              onChange={changeHandler}
              error = {errors?.phone_number}
            />
            
      </>
  )
}

export default PersonalInfo