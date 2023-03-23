import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT } from '../../constants';

import './header.css';

function Header({ userName }) {
	const location = useLocation();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		navigate('/login');
	};

	const userBlock = (
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
}

export default Header;
