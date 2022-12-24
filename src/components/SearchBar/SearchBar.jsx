import React,{
	useState
} from 'react'
import './SearchBar.css'

import {
	TextInput
} from '@mantine/core';

import {Icon} from '@iconify/react';

function SearchBar({placeholder,type}){

	const [query,setQuery] = useState("");

	const searchForAnything = (e) => {
		e.preventDefault();
		// onSubmit(query);
		console.log('searching for anything')
	}

	const searchWithinCategory = (e) => {
		e.preventDefault();
		// onSubmit(query);
		console.log('searching within category')
	}

	const onChange = (e) => {
		setQuery(e.target.value)
	}

	return(
		<div className = "searchbar">
			<form 
				action=""
				onSubmit={(e) => e.preventDefault()}
			>
				<TextInput 
					placeholder={
						type == "ANYTHING" ? "search for anything" : "search within category"
					}
					className = "input"
					size = "md"
					onChange={onChange}
					value = {query}
				/>
				{
					type == "ANYTHING" ?
					<button
						onClick = {searchForAnything}
						type = "submit"
					>
						<Icon icon = "material-symbols:search-rounded" />
					</button> :
					<button
						onClick = {searchWithinCategory}
						type = "submit"
					>
						<Icon icon = "material-symbols:search-rounded" />
					</button>
				}
			</form>
		</div>
	)

}

export default SearchBar;
