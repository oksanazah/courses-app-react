import { useState } from 'react';

import './input.css';

interface InputProps {
	placeholderText: string;
	inputId: string;
	onInputChange: (text: string) => void;
	inputType?: string;
	labelText?: string;
}

function Input({
	labelText,
	placeholderText,
	inputId,
	onInputChange,
	inputType = 'text',
}: InputProps) {
	const [inputText, setInputText] = useState<string>('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value;
		setInputText(text);
		onInputChange(text);
	};

	return (
		<>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				className='input'
				type={inputType}
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
