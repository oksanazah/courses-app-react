import { ON_LOGIN, ON_LOGOUT, ON_GET_USER } from './actionTypes';
import type { AuthResponse, UserResponse } from '../../helpers';

export const onLogin = (
	data: AuthResponse | undefined
): { type: string; payload: AuthResponse | undefined } => ({
	type: ON_LOGIN,
	payload: data,
});

export const onLogout = (): { type: string } => ({
	type: ON_LOGOUT,
});

export const onGetUser = (
	data: UserResponse | undefined
): {
	type: string;
	payload: UserResponse | undefined;
} => ({
	type: ON_GET_USER,
	payload: data,
});
