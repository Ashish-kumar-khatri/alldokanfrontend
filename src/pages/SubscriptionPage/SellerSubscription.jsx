import { TextInput,Select,Group,Avatar,Text,FileInput,Button } from '@mantine/core'
import React,{forwardRef,useState} from 'react'


import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useCloudinaryContext } from '../../hooks';


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

export const fields = [
    {
        type : "CITIZENSHIP",
        label : "citizenship front",
        name : "citizenship_front",
        icon : "material-symbols:upload"
    },
    {
        type : "CITIZENSHIP",
        label : "citizenship back",
        name : "citizenship_back",
        icon : "material-symbols:upload"
    },
    {
        type : "LISCENCE",
        label : "driving liscence front",
        name : "drivin_liscence_front",
        icon : "material-symbols:upload"
    },
    {
        type : "LISCENCE",
        label : "driving liscence back",
        name : "driving_liscence_back",
        icon : "material-symbols:upload"
    },
    {
        type : "PASSPORT",
        label : "passport front",
        name : "passport_front",
        icon : "material-symbols:upload"
    },
    {
        type : "PASSPORT",
        label : "passport back",
        name : "passport_back",
        icon : "material-symbols:upload"
    }
]


function SellerSubscription() {

    const [docType,setDocType] = useState(null);
    const [data,setData] = useState({})
    const [submitting,setSubmitting] = useState(false);

    const {uploadToCloudinary} = useCloudinaryContext();

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
        let promises = []
        Object.values(data).forEach(image => (
            promises.push(uploadToCloudinary('documents',image))
        ))
        Promise.all(promises)
            .then(res => {
                console.log("Res = ",res)
            })
            .catch(err => {
                console.log('error occured',err);
            })
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

    useEffect(() => {
        setData(prev => {})
    },[docType])


    return (
        <div className="seller-subscription-container subscription-wrapper bordered">
            <h3 className='title'>
                Seller registration
            </h3>
            {/* <hr /> */}
            <form action="" onSubmit = {submitHandler}>
                <Select 
                    itemComponent={SelectItem}
                    label = "document type"
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
                            key = {field.name}
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

export default SellerSubscription