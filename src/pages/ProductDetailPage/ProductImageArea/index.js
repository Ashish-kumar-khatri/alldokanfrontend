import React from 'react'
import Images from './Images';
import { Icon } from '@iconify/react';
import { Button, Image,Rating } from '@mantine/core';
import { Link } from 'react-router-dom';

import './style.css';

const images = [
    "https://res.cloudinary.com/djhsz1acw/image/upload/w_500,f_auto/v1670585322/cld-sample-5.jpg",
    "https://res.cloudinary.com/djhsz1acw/image/upload/w_500,f_auto/v1670585322/cld-sample-4.jpg",
    "https://res.cloudinary.com/djhsz1acw/image/upload/w_500,f_auto/v1664556169/samples/ecommerce/shoes.png",
    "https://res.cloudinary.com/djhsz1acw/image/upload/w_500,f_auto/v1664556159/samples/ecommerce/analog-classic.jpg"
]

function ProductImageArea() {
  return (
    <div className = "productimagearea-container">
        <Images 
            images = {images}
        />
        <div className = "details">
            <div className = "flex-column">
                <span className = "views" >
                    <Icon icon = "ic:baseline-remove-red-eye" />
                    3,454 Views
                </span>
                {/* <span className = "">
                    used
                </span> */}
            </div>
            <span className = "price">
                Rs. 65,00,000
            </span>
            <div className = "seller-details" onClick = {(e) => {console.log('going to seller details page')}}>
                <Image 
                  height = {55}
                  width = {55}
                  radius = {5}
                  src = {images[0]}
                />
                <div className='details'>
                  <span>
                    <Link to = "/" className='title' style = {{
                      // whiteSpace : "nowrap"
                    }}>
                      ram khatri enterprise
                    </Link>
                    <span className = "totalProducts light-text">37 products</span>
                  </span>
                  <span className = "phone light-text">
                    989577439
                  </span>
                </div>
                <span className='rating'>
                    <Rating 
                      value={3.5} 
                      fractions={2} 
                      size = "md"
                      readOnly 
                    />
                    <small className = "light-text">
                      (4.5)14 reviews
                    </small>
                </span>
            </div>
        </div>
        {/* <hr /> */}
        <div className = "action-btns">
          {
            false ?
              <Button
                variant='outline'
                rightIcon = {<Icon style = {{
                  fontSize : "var(--fs-l)"
                }} icon = "mdi:cards-heart" />}
                fullWidth
                size = "md"
              >
                Save to Wishlist
              </Button>: 
              <Button
                  variant='outline'
                  rightIcon = {<Icon style = {{
                    fontSize : "var(--fs-l)"
                  }} icon = "mdi:cards-heart-outline" />}
                  fullWidth
                  size = "md"
              >
                  remove from Wishlist
              </Button>
          }
        </div>
    </div>
  )
}

export default ProductImageArea