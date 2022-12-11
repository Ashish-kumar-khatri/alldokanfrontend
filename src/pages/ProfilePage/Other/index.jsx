import React from 'react'
import {Tabs} from '@mantine/core';
import MyProducts from './MyProducts';
import WishList from './Wishlist';
import PersonalDocuments from './PersonalDocuments';
import './style.css';

function Other() {
  return (
    <div
      className='profile-other bordered'
    >
       <Tabs defaultValue="myProducts">
        <Tabs.List grow>
          <Tabs.Tab value="myProducts">My Products</Tabs.Tab>
          <Tabs.Tab value="wishList">Wish List</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel 
          value = "myProducts"
        >
          <MyProducts />
        </Tabs.Panel>
        <Tabs.Panel 
          value = "wishList"
        >
          <WishList />
        </Tabs.Panel>
        <Tabs.Panel 
          value = "documents"
        >
          <PersonalDocuments />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Other