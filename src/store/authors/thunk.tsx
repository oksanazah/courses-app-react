import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { addAuthor, getAuthorsList } from '../../services';
import { createAuthor, getAuthors } from './actionCreators';
import { RootState } from '../store';
import type { Author } from '../../helpers';

export const getAuthorsThunk =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const data = await getAuthorsList();

		dispatch(getAuthors(data));
	};

export const addAuthorThunk =
	(
		author: Author,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await addAuthor(author, token);

		if (response.successful) {
			dispatch(createAuthor(response.result));
		}
	};
