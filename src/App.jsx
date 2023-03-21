import { useState } from 'react';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from './constants';

import './App.css';

function App() {
	const [createCourse, setCreateCourse] = useState(false);
	const [courseList, setCourseList] = useState(mockedCoursesList);
	const [authorList, setAuthorList] = useState(mockedAuthorsList);

	const newAuthorList = (authorList) => {
		setAuthorList(authorList);
	};

	const createNewCourse = (course) => {
		setCourseList([...courseList, course]);
	};

	const onButtonClick = () => {
		setCreateCourse(!createCourse);
	};

	return (
		<div className='app'>
			<Header />
			{createCourse ? (
				<CreateCourse
					onButtonClick={onButtonClick}
					createNewCourse={createNewCourse}
					newAuthorList={newAuthorList}
				/>
			) : (
				<Courses
					onButtonClick={onButtonClick}
					courseList={courseList}
					authorList={authorList}
				/>
			)}
		</div>
	);
}

export default App;
