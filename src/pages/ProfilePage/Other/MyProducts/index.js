import React from 'react'
import { ScrollArea, Checkbox, Image, Button } from '@mantine/core';
import { Icon } from '@iconify/react';
import { Table } from '../../../../components';

import './style.css';
import ProductList from '../ProductList';

const data = [
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_100,f_auto/v1664556178/samples/ecommerce/leather-bag-gray.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug"
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1670585322/cld-sample-4.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug" ,
    updated : "15 Aug"   
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1664556169/samples/ecommerce/shoes.png",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug"    
  },
  {
    id : "21342342873942942",
    image : "https://res.cloudinary.com/djhsz1acw/image/upload/w_300,f_auto/v1664556173/samples/animals/three-dogs.jpg",
    name : "nike shoe",
    shortDescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolore.",
    price : "3670",
    created : "12 Aug",
    updated : "15 Aug"
  }
]

const myProductTableHeadings = [
  "checkbox",
  "product",
  "created",
  "price",
  "updated",
  "Actions"
]

function MyProducts() {

  const rows = data?.map(item => (
    <tr>
        <td className='checkbox'>
          <Checkbox
          />
        </td>
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
            {item.created}
        </td>
        <td>
            Rs. {item.price}
        </td>
        <td>
            {item.updated}
        </td>
        <td>
          <button className='action-btn edit'>
            edit
          </button>
          <button className='action-btn delete'>
            delete
          </button>
        </td> 
    </tr>))

  return (
    <div className='myProducts-container products-list padded'>
      {/* <ScrollArea>
        <Table 
        >
          <thead>
            <tr>
              <th
              >
                <Checkbox 
                />
              </th>
              <th>product</th>
              <th>created</th>
              <th>price</th>
              <th>updated</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </ScrollArea> */}
      <Button  
        className = "add-product-btn"
        leftIcon = {<Icon icon = "material-symbols:add-box-outline" />}
      >
        add product
      </Button>
      <Table 
        headings = {myProductTableHeadings}
        items = {data}
        rows = {rows}
      />
    </div>
  )
}

export default MyProducts