import { GET_COURSES, DELETE_COURSE, CREATE_COURSE } from './actionTypes';
import { getCoursesList } from '../../services';
import type { Course, CourseResponse } from '../../helpers';

interface CourseAction {
	type: string;
	payload: Course[];
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

export const deleteCourse = (id: string): Promise<CourseAction> => {
	const res = getCoursesList().then(
		(data: CourseResponse): CourseAction => ({
			type: DELETE_COURSE,
			payload: data.result.filter(
				(course: Course): boolean => course.id !== id
			),
		})
	);

	return res;
};

export const createCourse = (
	course: Course
): { type: string; payload: Course } => ({
	type: CREATE_COURSE,
	payload: course,
});
