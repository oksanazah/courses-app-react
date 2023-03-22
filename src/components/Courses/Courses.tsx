import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import { Button } from '../../common/Button';
import { BUTTON_ADD } from '../../constants';
import type { Course, Author } from '../../helpers';

import './courses.css';

interface CoursesParams {
	courseList: Course[];
	authorList: Author[];
}

function Courses({ courseList, authorList }: CoursesParams) {
	const navigate = useNavigate();
	const [inputText, setInputText] = useState<string>('');

	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			navigate('/login');
		}
	});

	const onButtonClick = () => {
		navigate('/courses/add');
	};

	const onSearch = (inputText: string) => {
		setInputText(inputText);
	};

	const onReset = (inputText: string) => {
		if (inputText === '') {
			setInputText(inputText);
		}
	};

	const foundCourses = useMemo<Course[]>(() => {
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
