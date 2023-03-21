import { useState } from 'react';

import './input.css';

function Input({ labelText, placeholderText, inputId, onInputChange }) {
	const [inputText, setInputText] = useState('');
	const onChange = (e) => {
		const text = e.target.value;
		setInputText(text);
		onInputChange(text);
	};

	return (
		<>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				className='input'
				type='text'
				autoComplete='off'
				id={inputId}
				name={inputId}
				placeholder={placeholderText}
				value={inputText}
				onChange={onChange}
			/>
		</>
	);
}

export default Input;
