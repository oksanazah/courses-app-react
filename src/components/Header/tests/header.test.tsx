import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Header from '../Header';
import { mockedState } from '../../../constants';

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

test("Header should have logo and user's name", (): void => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);

	expect(screen.getByAltText('Logo')).toBeInTheDocument();
	expect(screen.getByText('Test Name')).toBeInTheDocument();
});
