import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Input from '../../common/Input';
import { Button } from '../../common/Button';
import AuthorList from './components/AuthorList';
import CourseAuthorList from './components/CourseAuthorList';
import { dateGenerator, pipeDuration } from '../../helpers';
import { addAuthorThunk, getAuthorsThunk } from '../../store/authors/thunk';
import {
	createCourseThunk,
	getCoursesThunk,
	updateCourseThunk,
} from '../../store/courses/thunk';
import { selectAuthors, selectCourses, useAppDispatch } from '../../store';
import type { Author, Course } from '../../helpers';
import {
	TITLE_ID,
	TITLE_LABEL,
	TITLE_PLACEHOLDER,
	AUTHOR_ID,
	AUTHOR_LABEL,
	AUTHOR_PLACEHOLDER,
	DURATION_ID,
	DURATION_LABEL,
	DURATION_PLACEHOLDER,
	BUTTON_CREATE,
	BUTTON_UPDATE,
	BUTTON_CREATE_AUTHOR,
	DESCRIPTION_ID,
	DESCRIPTION_PLACEHOLDER,
} from '../../constants';

import './course-form.css';

const CourseForm: React.FC = () => {
	const [inputTitle, setInputTitle] = useState<string>('');
	const [inputDescription, setInputDescription] = useState<string>('');
	const [inputDuration, setInputDuration] = useState<string>('');
	const [newAuthor, setNewAuthor] = useState<Author>({ name: '', id: '' });

	const allAuthorList = useSelector(selectAuthors);
	const allCoursesList = useSelector(selectCourses);
	const [authorList, setAuthorList] = useState<Author[]>(allAuthorList);
	const [courseAuthorList, setcourseAuthorList] = useState<Author[]>([]);

	const token = localStorage.getItem('token');
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const updateCourse = allCoursesList.find((course) => course.id === courseId);

	useEffect(() => {
		dispatch(getCoursesThunk());
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	useEffect(() => {
		if (!updateCourse) {
			return;
		}

		setInputTitle(updateCourse.title);
		setInputDescription(updateCourse.description);
		setInputDuration(updateCourse.duration.toString());

		setcourseAuthorList(
			allAuthorList.filter((author) => updateCourse.authors.includes(author.id))
		);

		setAuthorList(
			allAuthorList.filter(
				(author) => !updateCourse.authors.includes(author.id)
			)
		);
	}, [updateCourse, allAuthorList]);

	const onCreateCourse = (): void => {
		if (
			inputTitle.length < 1 ||
			inputDescription.length < 2 ||
			!inputDuration ||
			courseAuthorList.length < 1
		) {
			alert('Please, fill in all fields');
			return;
		}

		const newCourse: Course = {
			id: uuidv4(),
			title: inputTitle,
			description: inputDescription,
			creationDate: dateGenerator(),
			duration: Number(inputDuration),
			authors: courseAuthorList.map((author: Author): string => author.id),
		};

		if (!updateCourse && token) {
			dispatch(createCourseThunk(newCourse, token));
		}
		if (updateCourse && token && courseId) {
			dispatch(updateCourseThunk(newCourse, courseId, token));
		}

		navigate('/courses');
	};

	const onDurationChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		if (isNaN(Number(value))) {
			setInputDuration('');
			return;
		}

		setInputDuration(value.trim());
	};

	const onDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		const text: string = e.target.value;

		setInputDescription(text.trim());
	};

	const onTitleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setInputTitle(value.trim());
	};

	const onAuthorChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>): void => {
		const newAuthor: Author = {
			id: uuidv4(),
			name: value.trim(),
		};
		setNewAuthor(newAuthor);
	};

	const onCreateAuthor = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		if (!newAuthor.name || newAuthor.name.length < 2) {
			return;
		}

		if (token) {
			dispatch(addAuthorThunk(newAuthor, token));
		}

		setAuthorList([...authorList, newAuthor]);
		setNewAuthor({ name: '', id: '' });
	};

	const addAuthor = useCallback(
		(id: string): void => {
			const author: Author[] = authorList.filter(
				(author: Author): boolean => author.id === id
			);
			setcourseAuthorList([...courseAuthorList, ...author]);

			const listAuthors: Author[] = authorList.filter(
				(author: Author): boolean => author.id !== id
			);
			setAuthorList(listAuthors);
		},
		[authorList, courseAuthorList]
	);

	const deleteAuthor = useCallback(
		(id: string): void => {
			const author: Author[] = courseAuthorList.filter(
				(author: Author): boolean => author.id === id
			);
			setAuthorList([...authorList, ...author]);

			const listCourseAuthors: Author[] = courseAuthorList.filter(
				(author: Author): boolean => author.id !== id
			);
			setcourseAuthorList(listCourseAuthors);
		},
		[authorList, courseAuthorList]
	);

	return (
		<div className='create-courses'>
			<div className='create-title'>
				<div>
					<Input
						inputId={TITLE_ID}
						placeholderText={TITLE_PLACEHOLDER}
						onInputChange={onTitleChange}
						labelText={TITLE_LABEL}
						inputText={inputTitle}
					/>
				</div>
				<div className='create-button'>
					<Button
						buttonText={updateCourse ? BUTTON_UPDATE : BUTTON_CREATE}
						onButtonClick={onCreateCourse}
					/>
				</div>
			</div>

			<div className='create-description'>
				<label htmlFor={DESCRIPTION_ID}>Description</label>
				<textarea
					name={DESCRIPTION_ID}
					id={DESCRIPTION_ID}
					placeholder={DESCRIPTION_PLACEHOLDER}
					onChange={onDescriptionChange}
					rows={5}
					value={inputDescription}
				></textarea>
			</div>

			<div className='add-author-field'>
				<div className='add-author'>
					<h4>Add author</h4>
					<Input
						inputId={AUTHOR_ID}
						placeholderText={AUTHOR_PLACEHOLDER}
						onInputChange={onAuthorChange}
						labelText={AUTHOR_LABEL}
						inputText={newAuthor.name}
					/>
					<div className='create-author-button'>
						<Button
							buttonText={BUTTON_CREATE_AUTHOR}
							onButtonClick={onCreateAuthor}
						/>
					</div>
				</div>

				<AuthorList addAuthor={addAuthor} authorList={authorList} />

				<div className='duration'>
					<h4>Duration</h4>
					<Input
						inputId={DURATION_ID}
						placeholderText={DURATION_PLACEHOLDER}
						onInputChange={onDurationChange}
						labelText={DURATION_LABEL}
						inputText={inputDuration}
					/>
					<div className='transform-duration'>
						Duration: <span>{pipeDuration(Number(inputDuration))}</span> hours
					</div>
				</div>

				<CourseAuthorList
					deleteAuthor={deleteAuthor}
					courseAuthorList={courseAuthorList}
				/>
			</div>
		</div>
	);
};

export default CourseForm;
