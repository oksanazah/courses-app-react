import './button.css';

interface ButtonProps {
	buttonText: string | JSX.Element;
	onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
	buttonText,
	onButtonClick,
}) => <button onClick={onButtonClick}>{buttonText}</button>;
