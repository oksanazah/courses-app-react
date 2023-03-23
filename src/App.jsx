import { useState } from 'react';
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

import './App.css';

function App() {
	const [courseList, setCourseList] = useState(mockedCoursesList);
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [userName, setUserName] = useState(localStorage.getItem('name' || ''));

	const newAuthorList = (authorList) => {
		setAuthorList(authorList);
	};

	const createNewCourse = (course) => {
		setCourseList([...courseList, course]);
	};

	const getUserName = (userName) => {
		setUserName(userName);
	};

	return (
		<Router>
			<div className='app'>
				<Header userName={userName} />
				<Routes>
					<Route
						exact
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
					<Route path='/login' element={<Login getUserName={getUserName} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
