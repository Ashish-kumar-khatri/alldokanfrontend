import React,{
	useState
} from 'react'
import './SearchBar.css'

import {
	TextInput
} from '@mantine/core';

import {Icon} from '@iconify/react';

function SearchBar({onSubmit,placeholder}){

	const [query,setQuery] = useState("");

	const localSubmitHandler = (e) => {
		e.preventDefault();
		onSubmit(query);
	}

	const onChange = (e) => {
		setQuery(e.target.value)
	}


	return(
		<div className = "searchbar">
			<form 
				action=""
				onSubmit = {localSubmitHandler}
			>
				<TextInput 
					placeholder={placeholder}
					className = "input"
					size = "md"
					onChange={onChange}
					value = {query}
				/>
				<button
					type = "submit"
				>
					<Icon icon = "material-symbols:search-rounded" />
				</button>
			</form>
		</div>
	)

}

export default SearchBar;
