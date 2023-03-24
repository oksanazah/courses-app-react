import { AnyAction } from 'redux';

import { GET_COURSES, DELETE_COURSE, CREATE_COURSE } from './actionTypes';
import type { Course } from '../../helpers';

const coursesInitialState: Course[] = [];

const coursesReducer = (
	state = coursesInitialState,
	action: AnyAction
): Course[] => {
	switch (action.type) {
		case GET_COURSES:
			return [...action.payload];

		case DELETE_COURSE:
			return [...action.payload];

		case CREATE_COURSE:
			return [...state, action.payload];

		default:
			return state;
	}
};

export default coursesReducer;
