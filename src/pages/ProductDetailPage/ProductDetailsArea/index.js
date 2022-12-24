import React,{
  useState
} from 'react'
import { Tabs } from '@mantine/core';
import {
  MyParagraphCollapsable
} from '../../../components/'
import tabs from './tabLists';

import './style.css';


function ProductDetailsArea() {

  const [defaultTab,setDefaultTab] = useState(tabs[0].title)

  return (
    <div className = "productdetailsarea-container">
      <h2 className = "title">
      Fully Furnished House for Rent at Budhanilkantha
      </h2>
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