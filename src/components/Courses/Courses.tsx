import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import { Button } from '../../common/Button';
import { BUTTON_ADD } from '../../constants';
import { selectCourses, selectAuthors, selectUser } from '../../store';
import { getCoursesThunk } from '../../store/courses/thunk';
import { getAuthorsThunk } from '../../store/authors/thunk';
import { useAppDispatch } from '../../store';
import type { Course, Author, User } from '../../helpers';

import './courses.css';

const Courses: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [inputText, setInputText] = useState<string>('');

	const courseList: Course[] = useSelector(selectCourses);
	const authorList: Author[] = useSelector(selectAuthors);
	const { isAuth }: User = useSelector(selectUser);

	useEffect((): void => {
		if (!isAuth) {
			navigate('/');
		}
	}, [navigate, isAuth]);

	useEffect(() => {
		dispatch(getCoursesThunk());
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	const onButtonClick = (): void => {
		navigate('/courses/add');
	};

	const onSearch = (inputText: string): void => {
		setInputText(inputText);
	};

	const onReset = (inputText: string): void => {
		if (inputText === '') {
			setInputText(inputText);
		}
	};

	const foundCourses: Course[] = useMemo<Course[]>((): Course[] => {
		if (inputText.length === 0) {
			return courseList;
		}

		return courseList.filter(
			(course: Course) =>
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
			<div data-testid='courses-container'>
				{foundCourses.map((course: Course) => {
					const authorNames: (string | null)[] = course.authors.map(
						(author: string): string | null =>
							authorList.find(
								(mockedAuthor: Author): boolean => mockedAuthor.id === author
							)?.name || null
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
};

export default Courses;
