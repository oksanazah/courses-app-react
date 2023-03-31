import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { auth, getUser, logout } from '../../services';
import { onLogin, onLogout, onGetUser } from './actionCreators';
import { RootState } from '../store';
import type { User } from '../../helpers';

export const onLoginThunk =
	(user: User, url: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const data = await auth(user, url);

		localStorage.setItem('token', `${data?.result}`);
		localStorage.setItem('name', `${data?.user?.name}`);

		dispatch(onLogin(data));
	};

export const onLogoutThunk =
	(token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	(dispatch: Dispatch, getState): void => {
		logout(token);

		localStorage.removeItem('token');
		localStorage.removeItem('name');

		dispatch(onLogout());
	};

export const getUserThunk =
	(token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const data = await getUser(token);

		dispatch(onGetUser(data));
	};
