import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CourseForm from '../../CourseForm';
import {
	mockedState,
	BUTTON_CREATE_AUTHOR,
	BUTTON_ADD_AUTHOR,
	BUTTON_DELETE_AUTHOR,
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
	expect(screen.getAllByTestId('all-authors-item').length).toBe(2);

	expect(screen.queryByTestId('course-authors')).toBe(null);
});

test("CourseForm 'Create author' click button should call dispatch", async (): Promise<void> => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);

	fireEvent.click(screen.getByText(BUTTON_CREATE_AUTHOR));

	await waitFor(() => expect(mockedStore.dispatch).toHaveBeenCalledTimes(2)); // ??????
});

test("CourseForm 'Add author' button click should add an author to course authors list", (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.queryByTestId('course-authors')).toBe(null);

	fireEvent.click(
		screen.getAllByRole('button', { name: BUTTON_ADD_AUTHOR })[0]
	);

	expect(screen.getAllByTestId('course-authors-item').length).toBe(2); // ??????
});

test("CourseForm 'Delete author' button click should delete an author from the course list", (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);

	fireEvent.click(
		screen.getAllByRole('button', { name: BUTTON_ADD_AUTHOR })[0]
	);

	expect(screen.getAllByTestId('course-authors-item').length).toBe(2); // ??????

	fireEvent.click(
		screen.getAllByRole('button', { name: BUTTON_DELETE_AUTHOR })[0]
	);

	expect(screen.queryByTestId('course-authors')).toBe(null); // ??????
});
