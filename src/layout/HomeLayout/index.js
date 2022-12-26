import './style.css';

import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';
import { 
    CategoriesList,
    Nav,
    SearchBar
} from '../../components';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';

const HomeLayout = ({categoriesList,Ad,children,searchBarType}) => {
    const [categories,setCategories] = useState([])

    const [width] = useWindowSize();

    const {mobileShowSideCategories,setMobileShowSideCategories,saveCategories} = useGlobalContext();
    const {fetchAllCategories} = useGlobalContext();

    const getAllCategories = async () => {
        console.log('getting all catregories');
        try{
            const res = await fetchAllCategories();
            console.log('res = ',res);
            saveCategories(res.data);
            setCategories(res.data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllCategories();
        return () => {
            console.log('called cleanup function inside category list and set categories to empty',categories)
        }
    },[])

    return(
        <div className = "homelayout">
            <Nav
              burger = {true}
            >
              <SearchBar 
                placeholder = "Search for anything"
                type = {searchBarType}
              />
            </Nav>
            <div className = "wrapper main">
                <div>
                    {Ad}
                </div>
                {
                    // (mobileShowSideCategories || width > 800) &&
                    <div 
                        className = {`${mobileShowSideCategories ? "opened" : ""} left-sidebar bordered`}
                    >
                        <button 
                            className = "closebtn"
                            onClick = {() => setMobileShowSideCategories(prev => !prev)}
                        >
                            <Icon icon = "gg:close" />
                        </button>
                        <CategoriesList 
                            categoriesItems = {categories}
                        />
                    </div>
                }
                <div 
                    className = "left-sidebar-close"
                    
                ></div>
                <div 
                    className='center bordered'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeLayout;