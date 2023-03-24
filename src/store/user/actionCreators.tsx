import { ON_LOGIN, ON_LOGOUT } from './actionTypes';
import { auth } from '../../services';
import type { User, AuthResponse } from '../../helpers';

export const onLogin = (
	user: User,
	url: string
): Promise<{ type: string; payload: AuthResponse | undefined }> => {
	const res = auth(user, url).then((data) => ({
		type: ON_LOGIN,
		payload: data,
	}));

	return res;
};
