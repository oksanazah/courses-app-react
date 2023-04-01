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

const SearchBar: React.FC<SearchBarParams> = ({ onSearch, onReset }) => {
	const [inputText, setInputText] = useState<string>('');

	const onInputChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setInputText(value);
		onReset(value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		onSearch(inputText);
	};

	return (
		<form className='search' onSubmit={onSubmit}>
			<Input
				inputId={SEARCH_ID}
				placeholderText={SEARCH_PLACEHOLDER}
				onInputChange={onInputChange}
			/>
			<Button buttonText={BUTTON_SEARCH} />
		</form>
	);
};

export default SearchBar;
