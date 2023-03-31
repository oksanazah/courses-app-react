import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseForm from './components/CourseForm';
import CourseInfo from './components/CourseInfo';
import Registration from './components/Registration';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import { getUserThunk } from './store/user/thunk';
import { selectUser, useAppDispatch } from './store';

import './App.css';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const userName = useSelector(selectUser);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(getUserThunk(token));
		}
	}, [dispatch]);

	return (
		<Router>
			<div className='app'>
				<Header userName={userName.name} />
				<Routes>
					<Route
						path='/'
						element={
							localStorage.getItem('token') === null ? (
								<Navigate to={'/login'} />
							) : (
								<Navigate to={'/courses'} />
							)
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route
						path='/courses/add'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
