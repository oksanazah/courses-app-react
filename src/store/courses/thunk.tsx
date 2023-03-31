import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import {
	createCourse,
	deleteCourseAction,
	getCourses,
	updateCourseAction,
} from './actionCreators';
import {
	getCoursesList,
	deleteCourse,
	addCourse,
	updateCourse,
} from '../../services';
import { RootState } from '../store';
import type { Course } from '../../helpers';

export const getCoursesThunk =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const data = await getCoursesList();

		dispatch(getCourses(data));
	};

export const deleteCourseThunk =
	(
		id: string,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await deleteCourse(id, token);

		if (response.successful) {
			dispatch(deleteCourseAction(id));
		}
	};

export const createCourseThunk =
	(
		course: Course,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await addCourse(course, token);

		if (response.successful) {
			dispatch(createCourse(response.result));
		}
	};

export const updateCourseThunk =
	(
		course: Course,
		id: string,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await updateCourse(course, id, token);

		if (response.successful) {
			dispatch(updateCourseAction(response.result));
		}
	};
