import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseInfo from './components/CourseInfo';
import Registration from './components/Registration';
import Login from './components/Login/Login';
import { mockedAuthorsList, mockedCoursesList } from './constants';
import type { Course, Author } from './helpers/interfaces';

import './App.css';

function App() {
	const [courseList, setCourseList] = useState<Course[]>(mockedCoursesList);
	const [authorList, setAuthorList] = useState<Author[]>(mockedAuthorsList);
	const [userName, setUserName] = useState<string | null>('');

	useEffect(() => {
		setUserName(localStorage.getItem('name'));
	}, []);

	const newAuthorList = (authorList: Author[]) => {
		setAuthorList(authorList);
	};

	const createNewCourse = (course: Course) => {
		setCourseList([...courseList, course]);
	};

	return (
		<Router>
			<div className='app'>
				<Header userName={userName} />
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
					<Route
						path='/courses/add'
						element={
							<CreateCourse
								createNewCourse={createNewCourse}
								newAuthorList={newAuthorList}
							/>
						}
					/>
					<Route
						path='/courses'
						element={
							<Courses courseList={courseList} authorList={authorList} />
						}
					/>
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
