import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT } from '../../constants';

import './header.css';

function Header() {
	return (
		<header>
			<div>
				<Logo />
			</div>
			<div>
				<span>Alex</span>
				<Button buttonText={BUTTON_LOGOUT} />
			</div>
		</header>
	);
}

export default Header;
