import React from 'react'
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

function ProductDetailPage(){
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
