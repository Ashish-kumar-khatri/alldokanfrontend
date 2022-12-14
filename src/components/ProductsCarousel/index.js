import { Carousel } from '@mantine/carousel'
import { Skeleton } from '@mantine/core';
import React from 'react'
import ProductCard from '../ProductCard'
import ProductsCarouselSkeleton from './ProductsCarouselSkeleton';

import './style.css';

function ProductsCarousel({
    title,
    products
}) {
  return (
    <div className = "products-carousel-container">
        <div className = "info">
            {
                products.length == 0 ?
                    <Skeleton 
                        height = {20}
                        width = {200}
                    />:
                    <h3>
                        {title}
                    </h3>
            }
        </div>
            {
                products.length == 0 ?
                    <ProductsCarouselSkeleton 
                        count = {10}
                    />:
                    <Carousel
                        align = "start" 
                        slideSize={0} 
                        slideGap="lg"
                    >
                        {
                            products.map((product, index) => (
                                <Carousel.Slide
                                    key = {`${product.title}${index}`}
                                >
                                    <ProductCard 
                                        title = {product.title}
                                        image = {product.image}
                                        condition = {product.condition}
                                        price = {product.price}
                                    />
                                </Carousel.Slide>
                            ))
                        }
                    </Carousel>
            }
    </div>
  )
}

export default ProductsCarousel