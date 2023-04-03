import './input.css';

interface InputProps {
	placeholderText: string;
	inputId: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputType?: string;
	labelText?: string;
	inputText?: string;
}

const Input: React.FC<InputProps> = ({
	labelText,
	placeholderText,
	inputId,
	onInputChange,
	inputText,
	inputType = 'text',
}) => {
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
				onChange={onInputChange}
			/>
		</>
	);
};

export default Input;
