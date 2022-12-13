import React from 'react'
import { Image,Rating } from '@mantine/core';

import { Table } from '../../../../components';
import './style.css';
import { Icon } from '@iconify/react';

const data = [
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_100,f_auto/v1664556178/samples/ecommerce/leather-bag-gray.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug",
    seller : {
      person_name : "ashish khatri",
      rating : 3
    }
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1670585322/cld-sample-4.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug" ,
    updated : "15 Aug",
    seller : {
      person_name : "gitra asdff",
      rating : 3.5
    }   
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1664556169/samples/ecommerce/shoes.png",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug",
    seller : {
      person_name : "sita thapa",
      rating : 4.5
    }    
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1664556173/samples/animals/three-dogs.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug",
    seller : {
      person_name : "ram koir",
      rating : 2.5
    }
  }
]


const headings = [
  "product",
  "seller",
  "inWishlist"
]

function WishList() {
  
  const rows = data?.map(item => (
    <tr>
        <td>
          <div className = "product">
            <Image 
              height = {80}
              width = {80}
              radius = {5}
              src = {item.image}
            />
            <div className='details'>
              <span className='title'>
                {item.name}
              </span>
              <span className='shortDescription'>
                {item.shortDescription}
              </span>
            </div>
          </div>
        </td>
        <td>
          <div className = "product product-seller">
            <Image 
                height = {35}
                width = {35}
                radius = {500}
                src = {item.image}
              />
              <div className='details'>
                <span className='title'>
                  {item.seller.person_name}
                </span>
                <span className='rating'>
                  <Rating 
                    value={item.seller.rating} 
                    fractions={2} 
                    size = "xs"
                    readOnly 
                  />
                </span>
              </div>
          </div>
        </td>
        <td>
          <button className='action-btn wishlisht-icon highlight'>
            <Icon icon = "mdi:cards-heart" />
          </button>
         
        </td> 
    </tr>))

  return (
    <div className='wishlist-container padded'>
        <Table 
          headings = {headings}
          rows = {rows}
        />
    </div>
  )
}

export default WishList