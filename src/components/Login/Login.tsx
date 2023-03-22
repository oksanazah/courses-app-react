import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import Input from '../../common/Input';
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

interface LoginProps {
	getUserName: (name: string) => void;
}

function Login({ getUserName }: LoginProps) {
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

		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (!response.ok) {
			if (!result.errors) {
				alert('wrong password');
				return;
			}

			alert(result.errors);
			return;
		}

		localStorage.setItem('token', `${result.result}`);
		localStorage.setItem('name', `${result.user.name}`);
		getUserName(result.user.name);

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
