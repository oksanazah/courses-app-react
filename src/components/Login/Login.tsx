import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import Input from '../../common/Input';
import { auth } from '../../services';
import {
	USER_EMAIL_ID,
	USER_EMAIL_LABEL,
	USER_EMAIL_PLACEHOLDER,
	USER_PASSWORD_ID,
	USER_PASSWORD_LABEL,
	USER_PASSWORD_PLACEHOLDER,
	BUTTON_LOGIN,
} from '../../constants';

import './login.css';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const user = {
		email,
		password,
	};

	const onEmailChange = (email: string) => {
		setEmail(email);
	};

	const onPasswordChange = (password: string) => {
		setPassword(password);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = await auth(user, 'login');

		localStorage.setItem('token', `${result.result}`);
		localStorage.setItem('name', `${result.user.name}`);

		navigate('/courses');
	};

	return (
		<div className='login'>
			<h1>Login</h1>
			<form className='login-form' onSubmit={onSubmit}>
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
				<Button buttonText={BUTTON_LOGIN} />
			</form>
			<p>
				If you not have an account you can{' '}
				<Link to={'/registration'}>Registration</Link>
			</p>
		</div>
	);
}

export default Login;
