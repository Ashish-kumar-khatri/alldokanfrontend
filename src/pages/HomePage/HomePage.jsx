import { Button } from '@mantine/core';
import React from 'react'
import { Logo, Nav, SearchBar, CategoriesList, Ad, ProductCard } from '../../components';
import HomeLayout from '../../layout/HomeLayout';
import {Carousel} from '@mantine/carousel';
import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';

import './HomePage.css';
import {products1,products2} from './products';

function HomePage() {


  const searchHandler = (query) => {
    console.log('submitted to search everywhere',query);
  }

  return (
    <>
      <HomeLayout
        nav = {
            <Nav
              burger = {true}
            >
              <SearchBar 
                placeholder = "Search for anything"
                onSubmit = {searchHandler}
              />
            </Nav>
          }
        // categoriesList = {<CategoriesList />}
        // mobileCategoriesList = {<CategoriesList  />}
        Ad = {<Ad />}
      >
        <div className="home-products" >
        <h3
            style = {{
                textTransform : "capitalize",
                marginBottom : "1em"
            }}
        >Top viewed</h3>
        <Carousel 
            className = "carousel-container" 
            align = "start" 
            slideSize={0} 
            slideGap="lg"
        >
           {
            products1.map((product,index) => (
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
          {/* <Carousel
            title = "top listing"
          >
           {
            products.map(product => (
              <ProductCard 
                key = {product.title}
                title = {product.title}
                image = {product.image}
                condition = {product.condition}
                price = {product.price}
            />
            ))
           }
          </Carousel> */}
          <br/>
          <br/>
          <br/>

          {/* <Carousel
            title = "verified seller products"
          >
            <ProductCard 

            />
          </Carousel> */}
          {/* <div>something viewed</div> */}
          <h3
            style = {{
                textTransform : "capitalize",
                marginBottom : "1.4em"
            }}
          >From top verified seller</h3>
          <Carousel 
            className = "carousel-container" 
            align = "start" 
            slideSize={0} 
            slideGap="lg"
        >
           {
            products2.map(product => (
             <Carousel.Slide
              key = {product.title}
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
        </div>
      </HomeLayout>
    </>
  )
}

export default HomePage

