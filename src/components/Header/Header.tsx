import { useSelector } from 'react-redux';

import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT } from '../../constants';
import { onLogoutThunk } from '../../store/user/thunk';
import { selectUser, useAppDispatch } from '../../store';

import './header.css';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const userName = useSelector(selectUser);

	const logout = (): void => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(onLogoutThunk(token));
		}
	};

	const userBlock: JSX.Element = (
		<>
			<span>{userName.name}</span>
			<Button buttonText={BUTTON_LOGOUT} onButtonClick={logout} />
		</>
	);

	return (
		<>
			<header>
				<div>
					<Logo />
				</div>
				<div>{userName.isAuth ? userBlock : null}</div>
			</header>
		</>
	);
};

export default Header;
