import { useState } from 'react';

import { Button } from '../../../../common/Button';
import Input from '../../../../common/Input';
import {
	SEARCH_PLACEHOLDER,
	SEARCH_ID,
	BUTTON_SEARCH,
} from '../../../../constants';

import './search-bar.css';

function SearchBar({ onSearch, onReset }) {
	const [inputText, setInputText] = useState('');
	const onInputChange = (inputText) => {
		setInputText(inputText);
		onReset(inputText);
	};

	const onButtonClick = (e) => {
		e.preventDefault();
		onSearch(inputText);
	};

	return (
		<div className='search'>
			<Input
				inputId={SEARCH_ID}
				placeholderText={SEARCH_PLACEHOLDER}
				onInputChange={onInputChange}
			/>
			<Button buttonText={BUTTON_SEARCH} onButtonClick={onButtonClick} />
		</div>
	);
}

export default SearchBar;
