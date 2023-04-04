import fetchMock from 'jest-fetch-mock';

import reducer from '../courses/reducer';
import { createCourse, getCourses } from '../courses/actionCreators';
import { mockedCoursesList } from '../../constants';
import { getCoursesList } from '../../services';
import type { Course } from '../../helpers';

fetchMock.enableMocks();

beforeEach((): void => {
	fetchMock.resetMocks();
});

test('reducer should return the initial state', (): void => {
	expect(reducer(undefined, { type: undefined })).toEqual([]);
});

test('reducer should handle CREATE_COURSE and returns new state', (): void => {
	const previousState: Course[] = [];
	const course = {
		id: '1',
		title: 'title',
		description: 'description',
		creationDate: '3/4/2023',
		duration: 120,
		authors: ['author', 'author2'],
	};

	expect(reducer(previousState, createCourse(course))).toEqual([course]);
});

test('reducer should handle GET_COURSES and returns new state', async (): Promise<void> => {
	const previousState: Course[] = [];
	fetchMock.mockResponseOnce(JSON.stringify({ result: mockedCoursesList }));

	const resp = await getCoursesList();

	expect(reducer(previousState, getCourses(resp))).toEqual(mockedCoursesList);
	expect(fetch).toHaveBeenCalledTimes(1);
});
