import './style.css';

import { Icon } from '@iconify/react';

import {useGlobalContext} from '../../hooks/';
import { CategoriesList } from '../../components';
import { useEffect, useState } from 'react';

const HomeLayout = ({nav,categoriesList,Ad,children}) => {
    const [categories,setCategories] = useState([])

    const {mobileShowSideCategories,setMobileShowSideCategories} = useGlobalContext();
    const {fetchAllCategories} = useGlobalContext();

    const getAllCategories = async () => {
        console.log('getting all catregories');
        try{
        const res = await fetchAllCategories();
        console.log('res = ',res);
        setCategories(res.data);
        }catch(err){
        console.log(err)
        }
    }

    useEffect(() => {
        getAllCategories();
    },[])

    return(
        <div className = "homelayout">
            {/* Categories */}
            {nav}
            <div className = "wrapper main">
                <div>
                    {Ad}
                </div>
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