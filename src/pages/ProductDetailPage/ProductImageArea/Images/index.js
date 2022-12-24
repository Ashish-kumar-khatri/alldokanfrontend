import React from 'react'
import {Carousel} from '@mantine/carousel';
import {Image} from '@mantine/core';
// import 'react-photo-view/dist/react-photo-view.css';
// import { PhotoProvider, PhotoView } from 'react-photo-view';

function Images({images}) {
  return (
    <div className = "images-lists-container">
        <Carousel sx={{
                overflow : "hidden",
                borderRadius : "8px",
                maxWidth : "500px"
        }} mx="auto" height={300}>
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