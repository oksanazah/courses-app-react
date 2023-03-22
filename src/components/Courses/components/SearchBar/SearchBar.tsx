import { useState } from 'react';

import { Button } from '../../../../common/Button';
import Input from '../../../../common/Input';
import {
	SEARCH_PLACEHOLDER,
	SEARCH_ID,
	BUTTON_SEARCH,
} from '../../../../constants';

import './search-bar.css';

interface SearchBarParams {
	onSearch: (text: string) => void;
	onReset: (text: string) => void;
}

function SearchBar({ onSearch, onReset }: SearchBarParams) {
	const [inputText, setInputText] = useState<string>('');

	const onInputChange = (inputText: string) => {
		setInputText(inputText);
		onReset(inputText);
	};

	const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
