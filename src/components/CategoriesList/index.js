import { Icon } from "@iconify/react";
import './style.css';
// import categoriesItems from "./categories-items";
import { useGlobalContext } from "../../hooks";
import CategoriesListSkeleton from "./CategoriesListSkeleton";


const CategoriesList = ({categoriesItems}) => {

    const {showMobileSideCategories,setShowMobileSideCategories} = useGlobalContext();

    console.log('categoriesItems = ',categoriesItems)

    return(
        <div className = {`${showMobileSideCategories ? "opened" : ""} categories-container`}>
            <span className="title">All Categories</span>
            <hr />
            <ul className="list">
                {
                    categoriesItems.length == 0 ?
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