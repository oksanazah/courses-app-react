import { useState } from 'react';

import './input.css';

interface InputProps {
	placeholderText: string;
	inputId: string;
	onInputChange: (text: string) => void;
	inputType?: string;
	labelText?: string;
}

const Input: React.FC<InputProps> = ({
	labelText,
	placeholderText,
	inputId,
	onInputChange,
	inputType = 'text',
}) => {
	const [inputText, setInputText] = useState<string>('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
};

export default Input;
