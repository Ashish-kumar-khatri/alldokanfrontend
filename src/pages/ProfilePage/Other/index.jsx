import React,{
  useState,
  useEffect
} from 'react'
import {ScrollArea, Tabs} from '@mantine/core';
import MyProducts from './MyProducts';
import WishList from './Wishlist';
import MySubscription from './MySubscription';

import PersonalDocuments from './PersonalDocuments';
import { useSearchParams } from 'react-router-dom';

import './style.css';
import { useQuery } from '../../../hooks';

const tabs = [
  {
    tabName : "myProducts",
    component : <MyProducts />
  },
  {
    tabName : "wishList",
    component : <WishList />
  },
  {
    tabName : "documents",
    component : <PersonalDocuments />
  },
  {
    tabName : "mySubscription",
    component : <MySubscription />
  }
]

function Other() {
  const query = useQuery();

  const [searchParam,setSearchParam] = useSearchParams();
  const [tab,setTab] = useState(query.get('tab') ? query.get('tab') : tabs[0].tabName)
  
  const tabName = query.get('tab');
  
  // useEffect(() => {
    // console.log('tabname = ',tabName)
    // setTab(tabName)
    
  // },[tabName])

  useEffect(() => {
    setSearchParam({
      tab : tab
    })
  },[tab])

  return (
    <div
      className='profile-other'
    >
          <Tabs defaultValue={tab} onTabChange = {(value) => {setTab(value)}}>
              <ScrollArea>
                <Tabs.List >
                  <Tabs.Tab value="myProducts">My Products</Tabs.Tab>
                  <Tabs.Tab value="wishList">Wish List</Tabs.Tab>
                  <Tabs.Tab value="documents">Documents</Tabs.Tab>
                  <Tabs.Tab value="mySubscription">My Subscription</Tabs.Tab>
                </Tabs.List>
              </ScrollArea>
              {
                tabs?.map(tab => (
                  <Tabs.Panel
                    key = {tab.tabName}
                    value = {tab.tabName}
                  >
                    {tab.component}
                  </Tabs.Panel>
                ))
              }
          </Tabs>
    </div>
  )
}

export default Other