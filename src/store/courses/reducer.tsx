import { AnyAction } from 'redux';

import {
	GET_COURSES,
	DELETE_COURSE,
	CREATE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
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
			return state.filter(
				(course: Course): boolean => course.id !== action.payload
			);

		case CREATE_COURSE:
			return [...state, action.payload];

		case UPDATE_COURSE:
			const index: number = state.findIndex(
				(course: Course): boolean => course.id === action.payload.id
			);
			return [
				...state.slice(0, index),
				action.payload,
				...state.slice(index + 1),
			];

		default:
			return state;
	}
};

export default coursesReducer;
