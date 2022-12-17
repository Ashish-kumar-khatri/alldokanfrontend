import { TextInput,Select,Group,Avatar,Text,FileInput,Button,Image } from '@mantine/core'
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
    const {sellerRegistration,toggleImagePopup} = useGlobalContext();

    const [docType,setDocType] = useState(null);
    const [imageFront,setImageFront] = useState(null);
    const [imageBack,setImageBack] = useState(null);

    const [data,setData] = useState({
        account_type : "SELLER",
        seller_subscription_plan : query.get('type').toUpperCase(),
        personal_document : {
            document_type : null,
            document_image_front:null,
            document_image_back:null
        }
    })


    const [personalDocument,setPersonalDocument] = useState({});

    const [submitting,setSubmitting] = useState(false);
    const [posting,setPosting] = useState(false);
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
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!personalDocument["document_image_back"] || 
            !personalDocument["document_image_front"] ){
                createNotification({
                    title : "seller registration",
                    type : "failure",
                    timer : 5000,
                    message : "Please upload all documents",
                    icon : "material-symbols:sms-failed"
                })
                return;
        }
        try{
            let promises = [];
            let res;
            Object.keys(personalDocument).forEach(async key => {
                promises.push(uploadToCloudinary({
                    image : personalDocument[key],
                    doc_name : key
                }))
            });
            Promise.all(promises).then((res) => {
                console.log('res = ',res)
                res.forEach(r => setData(prev => ({
                    ...prev,
                    personal_document : {
                        ...prev["personal_document"],
                        [r.name] : r.secure_url
                    }
                })))
                setPosting(true);
            })
        }catch(err){
            console.log('error',err);
        }

        console.log(data);
    }

    const changeHandler = (file,name) => {
        console.log('changed',file,name)
        let reader = new FileReader();
        reader.onloadend = function() {
          console.log('result', reader.result)
          if(name == "document_image_front") setImageFront(reader.result);
          else if(name == "document_image_back") setImageBack(reader.result);
        }
        reader.readAsDataURL(file);
        setPersonalDocument(prev => ({
            ...prev,
            [name] : file
        }))
    }

    useEffect(() => {
        if(posting){
            (
                async function(){
                    try{
                        console.log('posting',data)
                        const res = await sellerRegistration(data);
                        console.log('res = ',res)
                        setPosting(false)
                        setSubmitting(false);
                    }catch(err){
                        console.log('error = ',err)
                        setPosting(false)
                        setSubmitting(false);
                    }
                }
            )()
        }
    },[posting])

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
                    onChange = {(value) => {
                        setDocType(value);
                        setData(prev => ({
                            ...prev,
                            personal_document : {
                                ...prev["personal_document"],
                                document_type : value
                            }
                        }))
                    }}
                    disabled = {submitting}
                />
                {
                    fields.map(field => (
                        field.type == docType &&
                        <>
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
                            {
                                (field.name == "document_image_front" && imageFront) &&
                                <Image src = {imageFront} fit = "contain" height = {300} onClick = {(e) => toggleImagePopup({
                                    image : e.target.getAttribute("src")
                                })}/>
                            }
                            {
                                (field.name == "document_image_back" && imageBack) &&
                                <Image src = {imageBack} fit = "contain" height = {300} onClick = {(e) => toggleImagePopup({
                                    image : e.target.getAttribute("src")
                                })}/>
                            }
                        </>
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