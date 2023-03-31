import { AnyAction } from 'redux';

import { ON_LOGIN, ON_LOGOUT, ON_GET_USER } from './actionTypes';
import type { UserState } from '../../helpers';

const userInitialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userReducer = (
	state = userInitialState,
	action: AnyAction
): UserState => {
	switch (action.type) {
		case ON_LOGIN:
			return {
				...state,
				isAuth: action.payload.successful,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
				role: action.payload.user.name ? 'user' : 'admin',
			};

		case ON_LOGOUT:
			return userInitialState;

		case ON_GET_USER:
			return {
				...state,
				isAuth: action.payload.successful,
				name: action.payload.result.name,
				email: action.payload.result.email,
				role: action.payload.result.role,
			};

		default:
			return state;
	}
};

export default userReducer;
