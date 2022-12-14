import React from 'react'
import './style.css';
import {Skeleton,Image,Text} from '@mantine/core';

import {Icon} from '@iconify/react'
import { useAuthContext, useCreateNotification } from '../../hooks';
import { useWindowSize } from '@react-hook/window-size';

function ProductCard({
  title,
  image,
  condition,
  price
}) {

  const {createToast} = useCreateNotification();
  const {user} = useAuthContext();
  const [width] = useWindowSize();

  console.log('width = ',width)
  
  const wishlistHandler = (e) => {
    if(!user) return createToast({
      message : "you must be logged in"
    })
    createToast({
      icon : <Icon icon = "material-symbols:error-outline-rounded" />,
      message : "added to wishlist"
    })
  }

  return (
    <div className="productCard">
        {/* <div className="image">
            
        </div>
        <div className="details">
          <span className="name">
           
          </span>
          <span className="price">
            
          </span>
          <span className = "other"></span>
        </div> */}
        <div className="image" style = {{
          position : "relative",
          height : "100%",
          borderRadius : "10px",
        }}>
          <Image 
            radius="md"
            src={image}
            alt="Random unsplash image"
            className='bordered'
            style = {{
              borderRadius : "10px",
            }}
            height = {width < 800 ? 150 : 200}
          />
          <Text fw={500} fz = "xs"  style = {{
            opacity:".5",
            // border:"1px solid var(--gray-text)",
            width : "fit-content",
            padding:".1em 1em",
            borderRadius : "3px",
            position:"absolute",
            top:"1em",
            right : "1em",
            background : "rgba(0,0,0,.9)",
            fontWeight : "600",
            textTransform : "uppercase",
            color: "white"
          }}>{condition}</Text>
        </div>
        {/* <Skeleton height={200}  mb="xl" /> */}
        <Text fw={500}>{title}</Text>
        {/* <Skeleton height={8} radius="xl" /> */}
        
        <div
          style = {{
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center"
          }}
        >
          <Text fw={600} fz = "lg">Rs. {price}</Text>
          <span>
            <Icon onClick = {wishlistHandler} style = {{fontSize : "var(--fs-m)",cursor:"pointer"}}icon = "mdi:cards-heart-outline" />
          </span>
        </div>
        {/* <Skeleton height={8} mt={6} width="70%" radius="xl" /> */}
    </div>
  )
}

export default ProductCard