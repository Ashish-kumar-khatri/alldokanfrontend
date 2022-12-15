import './style.css';

import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';
import { CategoriesList } from '../../components';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';

const HomeLayout = ({nav,categoriesList,Ad,children}) => {
    const [categories,setCategories] = useState([])

    const [width] = useWindowSize();

    const {mobileShowSideCategories,setMobileShowSideCategories} = useGlobalContext();
    const {fetchAllCategories} = useGlobalContext();

    return(
        <div className = "homelayout">
            {/* Categories */}
            {nav}
            <div className = "wrapper main">
                <div>
                    {Ad}
                </div>
                {
                    (mobileShowSideCategories || width > 800) &&
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
                <div className = "left-sidebar-close"></div>
                <div 
                    className='center bordered'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeLayout;