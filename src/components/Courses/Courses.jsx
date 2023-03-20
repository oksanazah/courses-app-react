import { useState } from 'react';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import { Button } from '../../common/Button';
import { BUTTON_ADD } from '../../constants';

import './courses.css';

function Courses({ onButtonClick, courseList, authorList }) {
	const [inputText, setInputText] = useState('');

	const onSearch = (inputText) => {
		setInputText(inputText);
	};

	const onReset = (inputText) => {
		if (inputText === '') {
			setInputText(inputText);
		}
	};

	const searchCourse = (courseList, inputText) => {
		if (inputText.length === 0) {
			return courseList;
		}

		return courseList.filter(
			(course) =>
				course.title.toLowerCase().indexOf(inputText.toLowerCase()) > -1 ||
				course.id.toLowerCase().indexOf(inputText.toLowerCase()) > -1
		);
	};

	const foundCourses = searchCourse(courseList, inputText);

	return (
		<div className='courses'>
			<div className='search-wrapper'>
				<SearchBar onSearch={onSearch} onReset={onReset} />
				<div className='add-button'>
					<Button buttonText={BUTTON_ADD} onButtonClick={onButtonClick} />
				</div>
			</div>
			<div>
				{foundCourses.map((course) => {
					const authorNames = course.authors.map((author) => {
						for (let mockedAuthor of authorList) {
							if (mockedAuthor.id === author) {
								return mockedAuthor.name;
							}
						}
						return null;
					});
					return (
						<CourseCard
							key={course.id}
							course={course}
							authorNames={authorNames}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Courses;
