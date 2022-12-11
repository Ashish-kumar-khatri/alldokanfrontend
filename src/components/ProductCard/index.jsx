import React from 'react'
import './style.css';
import {Skeleton} from '@mantine/core';

function ProductCard() {
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
        <Skeleton height={200}  mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </div>
  )
}

export default ProductCard