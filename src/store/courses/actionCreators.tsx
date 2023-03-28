import {
	GET_COURSES,
	DELETE_COURSE,
	CREATE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
import { getCoursesList } from '../../services';
import type { Course, CourseResponse } from '../../helpers';

interface CourseAction {
	type: string;
	payload: Course[] | undefined;
}

export const getCourses = (): Promise<CourseAction> => {
	const res = getCoursesList().then(
		(data: CourseResponse): CourseAction => ({
			type: GET_COURSES,
			payload: data.result,
		})
	);

	return res;
};

export const deleteCourse = (
	id: string
): { type: string; payload: string } => ({
	type: DELETE_COURSE,
	payload: id,
});

export const createCourse = (
	course: Course
): { type: string; payload: Course } => ({
	type: CREATE_COURSE,
	payload: course,
});

export const updateCourse = (
	course: Course
): { type: string; payload: Course } => ({
	type: UPDATE_COURSE,
	payload: course,
});
