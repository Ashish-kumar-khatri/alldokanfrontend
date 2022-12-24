import React from 'react'
import './style.css';
import {
  MyParagraphCollapsable
} from '../../../../components';
import TabularDescription from './TabularDescription';

const description = `
Fully furnished 5BHK House for Rent at Budhanilkantha, Kathmandu
This property is located near Park Village Budhanilkantha right opposite to Rose Villa. Faced South west, this property gets access to Sunlight through out the day. 
Room Specification:
1 Master Bedroom
4 Bedroom
1 Kitchen
1 Hall
3 Washroom

Amenities:
1. TV & Internet
2. Air conditions
3. Refrigerator
4. Washing Machine
5. UPS Power back up
6. Hot & Cold Shower
7. Parking Space for more than 2 cars
8. Security guard quarter
`


const descriptions = [
  {
      name : "location",
      value : "budanilkantha, Budhanilkantha, Kathmandu"
  },
  {
      name : "delivery",
      value : "Not Available"
  },
  {
      name : "negotiable",
      value : "not negotiable"
  },
  {
      name : "product posted",
      value : "12 days ago"
  }
]

const data = [
  {
      name : "Road Size",
      value : "ThirteenToTwentyFeet"
  },
  {
    name : "Bedroom",
    value : "5"
  },
  {
    name : "Features",
    value : "TV, Internet, Air conditions, Refrigerator, Washing Machine, UPS Power back up, Hot & Cold Shower, Parking Space for more than 2 cars and Security guard quarter"
  },
  {
    name : "Type",
    value : "HouseIndividual"
  },
  {
    name : "Road Type",
    value : "Pitched"
  },
  {
    name : "Kitchen",
    value : "1"
  },
  {
    name : "Floor",
    value : "2.5"
  },
  {
    name : "Living Room",
    value : "1"
  },
  {
    name : "Land Mark",
    value : "Rose Villa and Park Village"
  },
  {
    name : "Bathroom",
    value : "4"
  },
  {
    name : "Furnishing",
    value : "Full"
  },

]

function Description() {
  return (
    <>
      <div className = "text-description light-text">
        <MyParagraphCollapsable 
          text = {description}
          lineClamp = {8}
        />
      </div>
      <TabularDescription 
        title = "General"
        data = {descriptions}
      />
      <TabularDescription  
        title = "Specifications"
        data = {data}
      />
    </>
  )
}

export default Description