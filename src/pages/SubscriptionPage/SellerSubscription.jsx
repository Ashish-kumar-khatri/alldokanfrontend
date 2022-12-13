import { TextInput,Select,Group,Avatar,Text,FileInput,Button } from '@mantine/core'
import React,{forwardRef,useState} from 'react'


import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useAuthContext, useCloudinaryContext, useCreateNotification, useGlobalContext, useQuery } from '../../hooks';


export const dropdown_data = [
    {
      image: 'ic:sharp-directions-bike',
      label: 'Driving liscence',
      value: 'DRIVING_LICENSE',
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
        name : "document_image_front",
        icon : "material-symbols:upload"
    },
    {
        type : "CITIZENSHIP",
        label : "citizenship back",
        name : "document_image_back",
        icon : "material-symbols:upload"
    },
    {
        type : "DRIVING_LICENSE",
        label : "driving liscence front",
        name : "document_image_front",
        icon : "material-symbols:upload"
    },
    {
        type : "DRIVING_LICENSE",
        label : "driving liscence back",
        name : "document_image_back",
        icon : "material-symbols:upload"
    },
    {
        type : "PASSPORT",
        label : "passport front",
        name : "document_image_front",
        icon : "material-symbols:upload"
    },
    {
        type : "PASSPORT",
        label : "passport back",
        name : "document_image_back",
        icon : "material-symbols:upload"
    }
]


function SellerSubscription() {

    const {user} = useAuthContext();
    const query = useQuery();
    const {sellerRegistration} = useGlobalContext();

    const [docType,setDocType] = useState(null);
    const [data,setData] = useState({
        account_type : "SELLER",
        seller_subscription_plan : "BASIC",
    })

    const [personalDocument,setPersonalDocument] = useState({});

    const [submitting,setSubmitting] = useState(false);
    const [startRegistering,setStartRegistering] = useState(false);

    const {uploadToCloudinary} = useCloudinaryContext();
    const {createNotification} = useCreateNotification();

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
        // e.preventDefault();
        // console.log('submitting = ',data);

        // setSubmitting(true);
        // let promises = []
        // if(!data || Object.keys(personalDocument).length !== 2){
        //     createNotification({
		// 		title : "seller registration",
		// 		type : "failure",
		// 		timer : 5000,
		// 		message : "please upload all documents",
		// 		icon : "material-symbols:sms-failed"
		// 	})
        //     setSubmitting(false);
        //     return;
        // }
        // Object.keys(personalDocument).forEach(key => (
        //     promises.push(uploadToCloudinary({
        //         image : personalDocument[key],
        //         doc_name : key,
        //         imageType : "documents"
        //     })
        // )))
        // Promise.all(promises)
        //     .then(res => {
        //         console.log("Res = ",res)
        //         res.forEach(r => {
        //             setPersonalDocument(prev => (
        //                 {
        //                     ...prev,
        //                     [r.doc_name] : r.secure_url
        //                 }
        //             ))
        //         })
        //         setPersonalDocument(prev => ({
        //             ...prev,
        //             document_type : docType
        //         }))
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setSubmitting(false);
        //         createNotification({
        //             title : "seller registration",
        //             type : "failure",
        //             timer : 5000,
        //             message : err,
        //             icon : "material-symbols:sms-failed"
        //         })
        //     })
    }

    const docTypeChangeHandler = (value) => {
        // setDocType(value);
    }

    const changeHandler = (file,name) => {
        console.log('changed',file,name)
        setPersonalDocument(prev => ({
            ...prev,
            [name] : file
        }))
    }

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
                            required
                        />
                    ))
                }
                <Button
                    type = "submit"
                    className = "submit-btn"
                    loading = {submitting}
                >
                    Register as Seller
                </Button>
            </form>
        </div>
    )
}

export default SellerSubscription