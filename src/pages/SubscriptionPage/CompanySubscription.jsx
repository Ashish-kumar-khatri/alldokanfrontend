import React,{
    useState,
    forwardRef
} from 'react'

import {
    Select,
    TextInput,
    Text,
    FileInput,
    Group,
    Button
} from '@mantine/core'

// import { dropdown_data } from './SellerSubscription';
import {fields} from './SellerSubscription';

import {Icon} from '@iconify/react';

export const dropdown_data = [
    {
      image: 'ic:sharp-directions-bike',
      label: 'Driving liscence',
      value: 'LISCENCE',
    },
    {
        image: 'material-symbols:credit-card-outline-sharp',
        label: 'citizenship',
        value: 'CITIZENSHIP',
    },
    {
        image : "icon-park-outline:passport",
        label : "passport",
        value : "PASSPORT"
    }
];

function CompanySubscription() {
  
    const [docType,setDocType] = useState(null);
    const [data,setData] = useState({})
    const [submitting,setSubmitting] = useState(false);

    const SelectItem = forwardRef(
        ({ image, label, description, ...others }, ref) => (
          <div ref={ref} {...others}>
            <Group noWrap>
            <Icon 
                style = {{
                    fontSize : "var(--fs-l)"
                }}
            icon = {image} />
      
              <div>
                <Text size="sm">{label}</Text>
                <Text size="xs" opacity={0.65}>
                  {description}
                </Text>
              </div>
            </Group>
          </div>
        )
      );
    

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitting',data)
        // sellerRegistration(data)
        //     .then(res => {

        //         setSubmitting(false);
        //     })
        //     .catch(err => {
        //         console.log('error occured = ',err);
        //     })
    }

    const docTypeChangeHandler = (value) => {
        // console.log(value)
        setDocType(value);
    }

    const changeHandler = (file,name) => {
        console.log('changed',file,name)
        setData(prev => ({
            ...prev,
            [name] : file
        }))
    }


    return (
        <div className="seller-subscription-container subscription-wrapper bordered">
            <h3 className='title'>
                Company registration
            </h3>
            <hr />
            <form action="" onSubmit = {submitHandler}>
               
                <Select 
                    itemComponent={SelectItem}
                    label = "owner document type"
                    name = "document type"
                    placeholder= "Pick one"
                    data = {dropdown_data}
                    onChange = {docTypeChangeHandler}
                    disabled = {submitting}
                />
                {
                    fields.map(field => (
                        field.type == docType &&
                        <FileInput 
                            label = {field.label}
                            name = {field.name}
                            placeholder= "upload png/jpg/jpeg"
                            icon = {<Icon icon = "material-symbols:upload" />}
                            accept = "image/png,image/jpg,image/jpeg"
                            disabled = {submitting}
                            onChange = {(file) => changeHandler(file,field.name)}
                        />
                    ))
                }
                <Button
                    type = "submit"
                    className = "submit-btn"
                >
                    Register as Seller
                </Button>
            </form>
        </div>
    )
}

export default CompanySubscription