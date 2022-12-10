import { Button } from '@mantine/core';
import React from 'react'
import { Logo, Nav, SearchBar, CategoriesList, Ad, Carousel, ProductCard } from '../../components';
import HomeLayout from '../../layout/HomeLayout';
import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';

import './HomePage.css';

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
          <Carousel
            title = "top listing"
          >
            <ProductCard 

            />
          </Carousel>
          <br/>
          <Carousel
            title = "verified seller products"
          >
            <ProductCard 

            />
          </Carousel>
          {/* <div>something viewed</div> */}
        </div>
      </HomeLayout>
    </>
  )
}

export default HomePage

