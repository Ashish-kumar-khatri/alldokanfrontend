import {
    useEffect,
    useState
} from 'react';
import { Icon } from "@iconify/react";
import './style.css';
// import categoriesItems from "./categories-items";
import { useGlobalContext } from "../../hooks";
import CategoriesListSkeleton from "./CategoriesListSkeleton";

const CategoriesList = ({}) => {
    const [categoriesItems,setCategories] = useState([]);
    const {showMobileSideCategories,setShowMobileSideCategories} = useGlobalContext();

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
        // if(categoriesItems.length == 0){
            getAllCategories();
        // }
        return () => {
            // setCategories([])
            console.log('called cleanup function inside category list and set categories to empty',categoriesItems)
        }
    },[])

    return(
        <div className = {`${showMobileSideCategories ? "opened" : ""} categories-container`}>
            <span className="title">All Categories</span>
            <hr />
            <ul className="list">
                {
                    (categoriesItems.length == 0 ) ?
                        <CategoriesListSkeleton />:
                        categoriesItems?.map((category,index) => (
                            <li 
                                className="active"
                                key = {`${category.cat_image}${index}`}
                            >
                                <Icon icon = {category.cat_image} />
                                <span>{category.cat_name}</span>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default CategoriesList;