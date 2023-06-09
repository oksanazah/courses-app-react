import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../../common/Button';
import Input from '../../common/Input';
import { selectUser, useAppDispatch } from '../../store';
import { onLoginThunk } from '../../store/user/thunk';
import type { User } from '../../helpers';
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

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth }: User = useSelector(selectUser);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const user: User = {
		email,
		password,
	};

	useEffect(() => {
		if (isAuth) navigate('/courses');
	}, [isAuth, navigate]);

	const onEmailChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(value);
	};

	const onPasswordChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(value);
	};

	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		dispatch(onLoginThunk(user, 'login'));
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
};

export default Login;
