import { ON_LOGIN, ON_LOGOUT } from './actionTypes';
import { auth } from '../../services';
import type { User, AuthResponse } from '../../helpers';

export const onLogin = async (
	user: User,
	url: string
): Promise<{ type: string; payload: AuthResponse | undefined }> => {
	const data = await auth(user, url);

	localStorage.setItem('token', `${data?.result}`);
	localStorage.setItem('name', `${data?.user?.name}`);

	return {
		type: ON_LOGIN,
		payload: data,
	};
};

export const onLogout = (): { type: string } => {
	localStorage.removeItem('token');
	localStorage.removeItem('name');

	return {
		type: ON_LOGOUT,
	};
};
