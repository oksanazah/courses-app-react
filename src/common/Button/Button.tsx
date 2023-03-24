import './button.css';

interface ButtonProps {
	buttonText: string;
	onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
	buttonText,
	onButtonClick,
}) => <button onClick={onButtonClick}>{buttonText}</button>;
