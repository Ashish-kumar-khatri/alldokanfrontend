import './style.css';

import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';
import { CategoriesList } from '../../components';

const HomeLayout = ({nav,categoriesList,Ad,children}) => {

    const {mobileShowSideCategories,setMobileShowSideCategories} = useGlobalContext();

    return(
        <div className = "homelayout">
            {/* Categories */}
            {nav}
            <div className = "wrapper main">
                <div>
                    {Ad}
                </div>
                <div className = {`${mobileShowSideCategories ? "opened" : ""} left-sidebar bordered`}>
                    <button 
                        className = "closebtn"
                        onClick = {() => setMobileShowSideCategories(prev => !prev)}
                    >
                        <Icon icon = "gg:close" />
                    </button>
                    <CategoriesList />
                </div>
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