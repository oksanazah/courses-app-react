import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseInfo from './components/CourseInfo';
import Registration from './components/Registration';
import Login from './components/Login/Login';
import ErrorPage from './components/ErrorPage';
import { getCourses } from './store/courses/actionCreators';
import { getAuthors } from './store/authors/actionCreators';
import { selectUser } from './store';

import './App.css';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const userName = useSelector(selectUser);

	useEffect(() => {
		const fetchCourses = async (): Promise<void> => {
			const data = await getCourses();

			dispatch(data);
		};

		fetchCourses();
	}, [dispatch]);

	useEffect(() => {
		const fetchAuthors = async (): Promise<void> => {
			const data = await getAuthors();
			dispatch(data);
		};

		fetchAuthors();
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
					?
					<Route path='/courses/add' element={<CreateCourse />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/error' element={<ErrorPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
