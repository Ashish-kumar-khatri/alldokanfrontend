import React from 'react'
import {Carousel as Box} from '@mantine/carousel'
import './style.css';

function Carousel({title,children}) {
  return (
    <>
        <h2
            style = {{
                textTransform : "capitalize",
                marginBottom : "1em"
            }}
        >{title}</h2>
        <Box 
            className = "carousel-container" 
            align = "start" 
            slideSize={0} 
            slideGap="lg"
        >
          
        </Box>
        <br />
    </>
  )
}

export default Carousel