import { AnyAction } from 'redux';

import { GET_AUTHORS, CREATE_AUTHOR } from './actionTypes';
import type { Author } from '../../helpers';

const authorsInitialState: Author[] = [];

const authorsReducer = (
	state = authorsInitialState,
	action: AnyAction
): Author[] => {
	switch (action.type) {
		case GET_AUTHORS:
			return [...action.payload];

		case CREATE_AUTHOR:
			return [...state, action.payload];

		default:
			return state;
	}
};

export default authorsReducer;
