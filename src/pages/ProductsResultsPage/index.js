import React from 'react'
import {
    Nav,
    SearchBar,
    Ad
} from '../../components/'

import HomeLayout from '../../layout/HomeLayout'


function ProductsResultsPage() {

    const searchHandler = () => {

    }

    return (
        <>
            <HomeLayout
                searchBarType="WITHINCATEGORY"
                Ad = {<Ad />}
            >
                product lists and results will come here
            </HomeLayout>
        </>
    )
}

export default ProductsResultsPage