import React from 'react'
import { Logo, Nav, SearchBar } from '../../components';
import './HomePage.css';

function HomePage() {


  const searchHandler = (query) => {
    console.log('submitted to search everywhere',query);
  }

  return (
    <>
      <Nav>
        <SearchBar 
          placeholder = "Search for anything"
          onSubmit = {searchHandler}
        />
      </Nav>
    </>
  )
}

export default HomePage