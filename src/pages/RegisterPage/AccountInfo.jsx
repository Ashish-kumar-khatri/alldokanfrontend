import React from 'react'

import {
    PasswordInput,
    TextInput
} from '@mantine/core'

function AccountInfo({data,errors,onChange}) {

    const changeHandler = (e) => {
        onChange({
            name : e.target.name,
            value : e.target.value
        })
    }

  return (
       <>
            <TextInput 
                label = "email"
                name = "email"
                size = "md"
                value = {data?.email}
                error = {errors?.email}
                onChange = {changeHandler}
            />
            <PasswordInput
                label = "password"
                name = "password"
                className='password'
                size = "md"
                value = {data?.password}
                onChange = {changeHandler}
                error = {errors?.password}
            />
            <PasswordInput
                label = "repeat password"
                name = "repeat_password"
                className='password'
                size = "md"
                value = {data?.repeat_password}
                onChange = {changeHandler}
                error = {errors?.repeat_password}
            />
       </>
  )
}

export default AccountInfo