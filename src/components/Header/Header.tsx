import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT } from '../../constants';

import './header.css';

interface HeaderProps {
	userName: string | null;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const logout = (): void => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
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
