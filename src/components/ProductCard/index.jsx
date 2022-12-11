import React from 'react'
import './style.css';
import {Skeleton,Image,Text} from '@mantine/core';

function ProductCard({
  title,
  image,
  condition,
  price
}) {
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
        <Image 
          radius="md"
          src={image}
          alt="Random unsplash image"
          className='bordered'
          style = {{
            borderRadius : "10px"
          }}
          height = {200}
        />
        {/* <Skeleton height={200}  mb="xl" /> */}
        <Text fw={500}>{title}</Text>
        {/* <Skeleton height={8} radius="xl" /> */}
        <Text fw={500} fz = "xs"  style = {{
          opacity:".5",
          border:"1px solid var(--gray-text)",
          width : "fit-content",
          padding:".1em 1em",
          borderRadius : "3px"
        }}>{condition}</Text>
        <Text fw={600} fz = "lg">Rs. {price}</Text>
        {/* <Skeleton height={8} mt={6} width="70%" radius="xl" /> */}
    </div>
  )
}

export default ProductCard