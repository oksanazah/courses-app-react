import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../common/Input';
import { Button } from '../../common/Button';
import AuthorList from './components/AuthorList';
import CourseAuthorList from './components/CourseAuthorList';
import { dateGenerator, pipeDuration } from '../../helpers';
import { getAuthors, createAuthor } from '../../store/authors/actionCreators';
import { createCourse } from '../../store/courses/actionCreators';
import type { Author, Course } from '../../helpers';
import type { RootState } from '../../App';
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
	BUTTON_CREATE_AUTHOR,
	DESCRIPTION_ID,
	DESCRIPTION_PLACEHOLDER,
} from '../../constants';

import './create-course.css';

const selectAuthors = (state: RootState): Author[] => state.authors;

const CreateCourse: React.FC = () => {
	const [inputTitle, setInputTitle] = useState<string>('');
	const [inputDescription, setInputDescription] = useState<string>('');
	const [inputDuration, setInputDuration] = useState<string>('');
	const [newAuthor, setNewAuthor] = useState<Author>({ name: '', id: '' });

	const allAuthorList = useSelector(selectAuthors);
	const [authorList, setAuthorList] = useState<Author[]>(allAuthorList);
	const [courseAuthorList, setcourseAuthorList] = useState<Author[]>([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		getAuthors().then((data) => dispatch(data));
	}, [dispatch]);

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

		dispatch(createCourse(newCourse));
		navigate('/courses');
	};

	const onDurationChange = (inputDuration: string): void => {
		if (isNaN(Number(inputDuration))) {
			setInputDuration('');
			return;
		}

		setInputDuration(inputDuration.trim());
	};

	const onDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		const text: string = e.target.value;

		if (text.length < 2) {
			return;
		}

		setInputDescription(text.trim());
	};

	const onTitleChange = (title: string): void => {
		setInputTitle(title.trim());
	};

	const onAuthorChange = (author: string): void => {
		const newAuthor: Author = {
			id: uuidv4(),
			name: author.trim(),
		};
		setNewAuthor(newAuthor);
	};

	const onCreateAuthor = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		if (!newAuthor.name || newAuthor.name.length < 2) {
			return;
		}

		dispatch(createAuthor(newAuthor));
		setAuthorList([...authorList, newAuthor]);
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
					/>
				</div>
				<div className='create-button'>
					<Button buttonText={BUTTON_CREATE} onButtonClick={onCreateCourse} />
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

export default CreateCourse;
