import React from 'react'
import { Logo, Nav, SearchBar, CategoriesList, Ad } from '../../components';
import HomeLayout from '../../layout/HomeLayout';

import './HomePage.css';

function HomePage() {


  const searchHandler = (query) => {
    console.log('submitted to search everywhere',query);
  }

  return (
    <>
      <HomeLayout
        nav = {
            <Nav>
              <SearchBar 
                placeholder = "Search for anything"
                onSubmit = {searchHandler}
              />
            </Nav>
          }
        categoriesList = {<CategoriesList />}
        Ad = {<Ad />}
      >
        <div className="home-products bordered" >
          <div>top viewed</div>
          <div>something viewed</div>
        </div>
      </HomeLayout>
    </>
  )
}

export default HomePage

