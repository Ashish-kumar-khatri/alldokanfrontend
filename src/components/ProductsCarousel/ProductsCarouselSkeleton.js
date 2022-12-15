import React from 'react'
import {
    Carousel
} from '@mantine/carousel';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
 
function ProductsCarouselSkeleton({count}) {


    const getProducts = (count) => {
        let skeletons = [];
        for(let i = 0 ; i < count ; i++){
            skeletons.push(
                <Carousel.Slide
                    key = {i}
                >
                    <ProductCardSkeleton />
                </Carousel.Slide>
            )
        }
        return skeletons;
    }


    return (
        <>
            <Carousel
                align = "start" 
                slideSize={0} 
                slideGap="lg"
            >
                {getProducts(count)}
            </Carousel>
        </>
    )
}

export default ProductsCarouselSkeleton