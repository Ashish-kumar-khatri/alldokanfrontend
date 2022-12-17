import { Button } from '@mantine/core';
import React, { useState,useEffect } from 'react'
import { 
  Logo, 
  Nav, 
  SearchBar, 
  CategoriesList, 
  Ad, 
  ProductCard,
  ProductsCarousel 
} from '../../components';
import HomeLayout from '../../layout/HomeLayout';
import {Carousel} from '@mantine/carousel';
import { Icon } from '@iconify/react';
import {useGlobalContext} from '../../hooks/';
import {products1,products2} from './products';

import './HomePage.css';

function HomePage() {

  const [topViewed,setTopViewed] = useState([]);
  const [topFromVerifiedSeller,setTopFromVerifiedSeller] = useState([]);

  useEffect(() => {
    // setTimeout(() => {
      setTopViewed(products1);
      setTopFromVerifiedSeller(products2);
    // },3000)
  },[products1,products2]);

  const searchHandler = (query) => {
    // console.log('submitted to search everywhere',query);
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
        Ad = {<Ad />}
      >
        <div className="home-products" >
          <ProductsCarousel 
            title = "Top viewed"
            products = {topViewed}
          />
          <ProductsCarousel 
            title = "From verified seller"
            products = {topFromVerifiedSeller}
          />
        </div>
      </HomeLayout>
    </>
  )
}

export default HomePage

