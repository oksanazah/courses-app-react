import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT } from '../../constants';
import { onLogout } from '../../store/user/actionCreators';

import './header.css';

interface HeaderProps {
	userName: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logout = (): void => {
		dispatch(onLogout());
		navigate('/login');
	};

	const userBlock: JSX.Element = (
		<>
			<span>{userName}</span>
			<Button buttonText={BUTTON_LOGOUT} onButtonClick={logout} />
		</>
	);

	return (
		<header>
			<div>
				<Logo />
			</div>
			<div>
				{location.pathname === '/registration' || location.pathname === '/login'
					? null
					: userBlock}
			</div>
		</header>
	);
};

export default Header;
