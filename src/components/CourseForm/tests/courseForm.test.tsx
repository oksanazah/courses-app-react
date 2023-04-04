import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CourseForm from '../../CourseForm';
import {
	mockedState,
	BUTTON_CREATE_AUTHOR,
	BUTTON_ADD_AUTHOR,
	mockedCoursesList,
} from '../../../constants';

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

test('CourseForm should show authors lists (all and course authors)', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByTestId('all-authors')).not.toBeEmptyDOMElement();

	// cant't mock opening on update route
	// const mockedPath = mockedCoursesList[0].id;

	// render(
	// 	<Provider store={mockedStore}>
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route
	// 					path={`/courses/update/${mockedPath}`}
	// 					element={<CourseForm />}
	// 				/>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	</Provider>
	// );

	// expect(screen.getByTestId('course-authors')).not.toBeEmptyDOMElement();
});

// can't call jest.fn() onclick
// test("CourseForm 'Create author' click button should call dispatch", (): void => {
// 	const dispatch = jest.fn();

// 	render(
// 		<Provider store={mockedStore}>
// 			<BrowserRouter>
// 				<CourseForm />
// 			</BrowserRouter>
// 		</Provider>
// 	);

// 	fireEvent.click(screen.getByText(BUTTON_CREATE_AUTHOR));

// 	expect(dispatch).toHaveBeenCalledTimes(1);
// });

// test("CourseForm 'Add author' button click should add an author to course authors list", (): void => {
// 	const onClick = jest.fn();

// 	render(
// 		<Provider store={mockedStore}>
// 			<BrowserRouter>
// 				<CourseForm />
// 			</BrowserRouter>
// 		</Provider>
// 	);

// 	fireEvent.click(
// 		screen.getAllByRole('button', { name: BUTTON_ADD_AUTHOR })[0]
// 	);
// 	expect(onClick).toHaveBeenCalledTimes(1);
// });
