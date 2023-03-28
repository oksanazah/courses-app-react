import { AnyAction } from 'redux';

import { ON_LOGIN, ON_LOGOUT } from './actionTypes';
import type { UserState } from '../../helpers';

const userInitialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

const userReducer = (
	state = userInitialState,
	action: AnyAction
): UserState => {
	switch (action.type) {
		case ON_LOGIN:
			return {
				isAuth: action.payload.successful,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
			};

		case ON_LOGOUT:
			return userInitialState;

		default:
			return state;
	}
};

export default userReducer;
