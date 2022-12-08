import { Icon } from "@iconify/react";
import './style.css';
import categoriesItems from "./categories-items";


const CategoriesList = () => {

    return(
        <div className = "categories-container bordered">
            <span className="title">All Categories</span>
            <hr />
            <ul className="list">
                {
                    categoriesItems.map(category => (
                        <li className="active">
                            <Icon icon = {category.icon} />
                            <span>{category.name}</span>
                        </li>
                    ))
                }
                {
                    categoriesItems.map(category => (
                        <li className="active">
                            <Icon icon = {category.icon} />
                            <span>{category.name}</span>
                        </li>
                    ))
                }
                {
                    categoriesItems.map(category => (
                        <li className="active">
                            <Icon icon = {category.icon} />
                            <span>{category.name}</span>
                        </li>
                    ))
                }
                {
                    categoriesItems.map(category => (
                        <li className="active">
                            <Icon icon = {category.icon} />
                            <span>{category.name}</span>
                        </li>
                    ))
                }
                {
                    categoriesItems.map(category => (
                        <li className="active">
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