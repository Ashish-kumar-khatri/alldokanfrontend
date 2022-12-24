import React from 'react'
import Images from './Images';
import { Icon } from '@iconify/react';
import { Button, Image,Rating } from '@mantine/core';
import { Link } from 'react-router-dom';

import './style.css';

const images = [
    "https://cdn02.hamrobazaar.com/User/Posts/2022/12/12/ead4bacc-7181-4262-8820-5998f2fa4e1e.webp?x-image-process=image/resize,m_lfit,h_500,w_500",
    "https://cdn02.hamrobazaar.com/User/Posts/2022/12/12/6ac0bf40-2fff-4eb6-aff0-1f5cbbbdf645.webp?x-image-process=image/resize,m_lfit,h_500,w_500",
    "https://cdn02.hamrobazaar.com/User/Posts/2022/12/12/8a7e001f-8714-45e9-9b11-418472d0ad8b.webp?x-image-process=image/resize,m_lfit,h_500,w_500",
    "https://cdn02.hamrobazaar.com/User/Posts/2022/12/12/6ac0bf40-2fff-4eb6-aff0-1f5cbbbdf645.webp?x-image-process=image/resize,m_lfit,h_500,w_500"
]

function ProductImageArea() {
  return (
    <div className = "productimagearea-container">
        <Images 
            images = {images}
        />
        
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