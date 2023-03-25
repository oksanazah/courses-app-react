import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import Input from '../../common/Input';
import { auth } from '../../services';
import type { User } from '../../helpers';
import {
	USER_NAME_ID,
	USER_NAME_LABEL,
	USER_NAME_PLACEHOLDER,
	USER_EMAIL_ID,
	USER_EMAIL_LABEL,
	USER_EMAIL_PLACEHOLDER,
	USER_PASSWORD_ID,
	USER_PASSWORD_LABEL,
	USER_PASSWORD_PLACEHOLDER,
	BUTTON_REGISTRATION,
} from '../../constants';

import './registration.css';

const Registration: React.FC = () => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const newUser: User = {
		name,
		email,
		password,
	};

	const onNameChange = (name: string): void => {
		setName(name);
	};

	const onEmailChange = (email: string): void => {
		setEmail(email);
	};

	const onPasswordChange = (password: string): void => {
		setPassword(password);
	};

	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		const result = await auth(newUser, 'register');

		if (result) {
			navigate('/login');
		}
	};

	return (
		<div className='registration'>
			<h1>Registration</h1>
			<form className='registration-form' onSubmit={onSubmit}>
				<Input
					inputId={USER_NAME_ID}
					labelText={USER_NAME_LABEL}
					placeholderText={USER_NAME_PLACEHOLDER}
					onInputChange={onNameChange}
				/>
				<Input
					inputType={'email'}
					inputId={USER_EMAIL_ID}
					labelText={USER_EMAIL_LABEL}
					placeholderText={USER_EMAIL_PLACEHOLDER}
					onInputChange={onEmailChange}
				/>
				<Input
					inputType={'password'}
					inputId={USER_PASSWORD_ID}
					labelText={USER_PASSWORD_LABEL}
					placeholderText={USER_PASSWORD_PLACEHOLDER}
					onInputChange={onPasswordChange}
				/>
				<Button buttonText={BUTTON_REGISTRATION} />
			</form>
			<p>
				If you have an account you can <Link to={'/login'}>Login</Link>
			</p>
		</div>
	);
};

export default Registration;
