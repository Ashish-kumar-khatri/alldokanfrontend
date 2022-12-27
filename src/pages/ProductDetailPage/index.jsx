import React, { useEffect,useState } from 'react'
import {
	Logo,
	Nav,
	Ad,
	SearchBar
} from '../../components/';

import HomeLayout from '../../layout/HomeLayout';
import SimpleLayout from '../../layout/SimpleLayout';
import OtherLayout from '../../layout/OtherLayout';
import ProductDetailsArea from './ProductDetailsArea';
import ProductImageArea from './ProductImageArea';

import './style.css';
import { useGlobalContext } from '../../hooks';

function ProductDetailPage(){

	const {getProduct} = useGlobalContext();

	const [product,setProduct] = useState(null);

	useEffect(() => {
		// not working so start from here
		// getProduct('6392cc31a579ef7aa1063e43')
		// 	.then(prod => setProduct(prod))
			// .catch(err => console.log('err = ',err))
	},[])

	return(
		<OtherLayout
			searchBarType = "ANYTHING"
		>
			<div className="product-detail-container">
				<div className="left-container">
					<ProductImageArea />
				</div>
				<div className="other-container">
					<ProductDetailsArea />
				</div>
				<div className="ad-container">
					<div>
					</div>
				</div>
			</div>
		</OtherLayout>
	)
}

export default ProductDetailPage;
