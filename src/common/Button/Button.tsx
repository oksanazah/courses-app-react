import './button.css';

interface ButtonProps {
	buttonText: string;
	onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ buttonText, onButtonClick }: ButtonProps) => (
	<button onClick={onButtonClick}>{buttonText}</button>
);
