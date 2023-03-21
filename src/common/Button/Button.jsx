import './button.css';

export const Button = ({ buttonText, onButtonClick }) => (
	<button onClick={onButtonClick}>{buttonText}</button>
);
