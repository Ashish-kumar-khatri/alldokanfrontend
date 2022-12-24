import React,{
  useState
} from 'react'
import { Tabs } from '@mantine/core';
import {
  MyParagraphCollapsable
} from '../../../components/'
import tabs from './tabLists';

import { Link } from 'react-router-dom';

import {
  Rating,
  Image
} from '@mantine/core'

import { Icon } from '@iconify/react';

import './style.css';


function ProductDetailsArea() {

  const [defaultTab,setDefaultTab] = useState(tabs[0].title)

  return (
    <div className = "productdetailsarea-container">
      <h2 className = "title">
      Fully Furnished House for Rent at Budhanilkantha
      </h2>
      <hr />
      <div className = "details">
            <span className = "price">
                Rs. 65,00,000
            </span>
            <div className = "flex-column light-text">
                <span className = "views" >
                    <Icon icon = "ic:baseline-remove-red-eye" />
                    3,454 Views
                </span>
                {/* <span className = "">
                    used
                </span> */}
            </div>
            <div className = "seller-details" onClick = {(e) => {console.log('going to seller details page')}}>
                <Image 
                  height = {55}
                  width = {55}
                  radius = {5}
                  src = "https://res.cloudinary.com/djhsz1acw/image/upload/v1670792683/qvcvw5zh1npuw74segge.jpg"
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
      <div className = "tabs-container">
        <Tabs defaultValue={defaultTab}>
          <Tabs.List>
            {
              tabs.map((tab, index) => (
                <Tabs.Tab
                  key = {index}
                  value = {tab.title}
                >
                  {tab.title}
                </Tabs.Tab>
              ))
            }
          </Tabs.List>
          <div className = "tab-content">
            {
              tabs.map((tab,index) => (
                <Tabs.Panel
                  key={index}
                  value={tab.title} 
                >
                  {tab.component}
                </Tabs.Panel>
              ))
            }
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default ProductDetailsArea