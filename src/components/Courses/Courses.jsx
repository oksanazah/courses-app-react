import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import { Button } from '../../common/Button';
import { BUTTON_ADD } from '../../constants';

import './courses.css';

function Courses({ courseList, authorList }) {
	const navigate = useNavigate();
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			navigate('/login');
		}
	}, [navigate]);

	const onButtonClick = () => {
		navigate('/courses/add');
	};

	const onSearch = (inputText) => {
		setInputText(inputText);
	};

	const onReset = (inputText) => {
		if (inputText === '') {
			setInputText(inputText);
		}
	};

	const foundCourses = useMemo(() => {
		if (inputText.length === 0) {
			return courseList;
		}

		return courseList.filter(
			(course) =>
				course.title.toLowerCase().indexOf(inputText.toLowerCase()) > -1 ||
				course.id.toLowerCase().indexOf(inputText.toLowerCase()) > -1
		);
	}, [courseList, inputText]);

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
					const authorNames = course.authors.map(
						(author) =>
							authorList.find((mockedAuthor) => mockedAuthor.id === author)
								?.name || null
					);
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
