import React,{
  useState
} from 'react'
import FeatureList from './FeatureList';
// import features from './features.js';
import { Icon } from '@iconify/react';

import './style.css';
import { Button, Collapse } from '@mantine/core';
import {useWindowSize} from '@react-hook/window-size'


function SubscriptionCard({
  title,
  price,
  features,
  active
}) {

  const [opened,setOpened] = useState(false);
  const [width] = useWindowSize();
  

  const collapseHandler = () => {
    if(width < 700){
      setOpened(prev => !prev)
    }
  }
  
  return (
    <div className={`${active ? "active" : ""} subscriptionCard bordered ${opened ? "opened" : ""}`}>
        <div className='header' onClick = {collapseHandler}>
            <span className="title badge safe">
                {title}
            </span>
            <h2 className="price">
                Rs. {price}/mth
            </h2>
            <p className="secondary">
                Includes upto 10 users and 20GB of individual data
            </p>
        </div>

        
        {
          width < 700 ?
            <Collapse className = "collapse-body-container" in = {opened}>
              <div className='body'>
                {
                  features?.map((feature,index) => (
                      <FeatureList 
                          key = {index}
                          type = {feature.type}
                          text = {feature.text}
                          className = "active"
                      />
                  ))
                }
              </div>
                  {
                    (width < 700 && !active) &&
                    <Button
                      style = {{
                        marginTop : "2em"
                      }}
                      color = "var(--primary)"
                    >
                      choose plan
                    </Button>
                }
          </Collapse>:
          <div className='body'>
            {
              features?.map((feature,index) => (
                  <FeatureList 
                      key = {index}
                      type = {feature.type}
                      text = {feature.text}
                      className = "active"
                  />
              ))
            }
          </div>
        }
        <div className="current-plan-indicator">
          <Icon icon = "material-symbols:check-circle-rounded" />
        </div>
        
    </div>
  )
}

export default SubscriptionCard