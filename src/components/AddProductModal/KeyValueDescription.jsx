import { Textarea } from '@mantine/core'
import React from 'react'

function KeyValueDescription({
  changeHandler,
  data
}) {

  return (
    <>
      <Textarea 
        name = "specifications"
        label = "Specifications"
        size = "md"
        placeholder = {`
          brand : lenovo,
          warranty : 2yr,
          color : black,
          size : 15inch,
          .....................
        `}
        minRows={7}
        autosize
        onChange = {(e) => {
          changeHandler({
            name : "specifications",
            value : e.target.value
          })
        }}
        value = {data?.specifications}
      />
    </>
  )
}

export default KeyValueDescription