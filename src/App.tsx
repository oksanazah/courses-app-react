import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './store';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseInfo from './components/CourseInfo';
import Registration from './components/Registration';
import Login from './components/Login/Login';
import { getCourses } from './store/courses/actionCreators';
import { getAuthors } from './store/authors/actionCreators';
import { selectUser } from './helpers';
import type { User } from './helpers';

import './App.css';

const store = createStore(rootReducer, composeWithDevTools());
type RootState = ReturnType<typeof store.getState>;

const App: React.FC = () => {
	const dispatch = useDispatch();
	const userName: User = useSelector(selectUser);

	useEffect(() => {
		getCourses().then((data) => dispatch(data));
	}, [dispatch]);

	useEffect(() => {
		getAuthors().then((data) => dispatch(data));
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
				</Routes>
			</div>
		</Router>
	);
};

export default App;
export { store, RootState };
