import { Icon } from "@iconify/react";
import './style.css';
import categoriesItems from "./categories-items";
import { useGlobalContext } from "../../hooks";


const CategoriesList = () => {

    const {showMobileSideCategories,setShowMobileSideCategories} = useGlobalContext();

    return(
        <div className = {`${showMobileSideCategories ? "opened" : ""} categories-container`}>
            <span className="title">All Categories</span>
            <hr />
            <ul className="list">
                {
                    categoriesItems.map(category => (
                        <li 
                            className="active"
                            key = {category.name}
                        >
                            <Icon icon = {category.icon} />
                            <span>{category.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoriesList;