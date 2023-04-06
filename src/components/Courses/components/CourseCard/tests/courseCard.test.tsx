import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CourseCard from '../CourseCard';
import { mockedState } from '../../../../../constants';

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

const course = {
	id: '1',
	title: 'title',
	description: 'description',
	creationDate: '3/4/2023',
	duration: 120,
	authors: ['author', 'author2'],
};

test('CourseCard should display title', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={course} authorNames={['author', 'author2']} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('title')).toBeInTheDocument();
});

test('CourseCard should display description', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={course} authorNames={['author', 'author2']} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('description')).toBeInTheDocument();
});

test('CourseCard should display duration in the correct format', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={course} authorNames={['author', 'author2']} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('02:00 hours')).toBeInTheDocument();
});

test('CourseCard should display authors list', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={course} authorNames={['author', 'author2']} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('author, author2')).toBeInTheDocument();
});

test('CourseCard should display created date in the correct format', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={course} authorNames={['author', 'author2']} />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('3/4/2023')).toBeInTheDocument();
});
