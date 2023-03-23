import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import Input from '../../common/Input';
import { auth } from '../../services';
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

function Registration() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const newUser = {
		name,
		email,
		password,
	};

	const onNameChange = (name) => {
		setName(name);
	};

	const onEmailChange = (email) => {
		setEmail(email);
	};

	const onPasswordChange = (password) => {
		setPassword(password);
	};

	const onSubmit = async (e) => {
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
}

export default Registration;
