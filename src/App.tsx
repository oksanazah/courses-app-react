import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import { getUserThunk } from './store/user/thunk';
import { useAppDispatch } from './store';
import { router } from './helpers';

import './App.css';

const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(getUserThunk(token));
		}
	}, [dispatch]);

	return (
		<div className='app'>
			<Header />
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
