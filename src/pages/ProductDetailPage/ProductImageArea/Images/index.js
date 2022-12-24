import React from 'react'
import {Carousel} from '@mantine/carousel';
import {Image} from '@mantine/core';

function Images({images}) {
  return (
    <div className = "images-lists-container">
        <Carousel sx={{
                overflow : "hidden",
                borderRadius : "8px",
                maxWidth : "500px"
        }} mx="auto" height="">
            {
                images.map(img => (
                    <Carousel.Slide
                        key = {img}
                        style = {{
                            width : "100%",
                        }}
                    >
                        <img 
                            style = {{
                                height : "100%",
                                width : "100%",
                                objectFit : "cover"
                            }}
                            src = {img} />
                    </Carousel.Slide>
                ))
            }
        </Carousel>
    </div>
  )
}

export default Images