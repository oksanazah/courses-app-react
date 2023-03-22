import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input';
import { Button } from '../../common/Button';
import AuthorList from './components/AuthorList';
import CourseAuthorList from './components/CourseAuthorList';
import { dateGenerator, pipeDuration } from '../../helpers';
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
	BUTTON_CREATE_AUTHOR,
	DESCRIPTION_ID,
	DESCRIPTION_PLACEHOLDER,
	mockedAuthorsList,
} from '../../constants';

import './create-course.css';

interface CreateCourseParams {
	createNewCourse: (course: Course) => void;
	newAuthorList: (authorList: Author[]) => void;
}

function CreateCourse({ createNewCourse, newAuthorList }: CreateCourseParams) {
	const [inputTitle, setInputTitle] = useState<string>('');
	const [inputDescription, setInputDescription] = useState<string>('');
	const [inputDuration, setInputDuration] = useState<string>('');
	const [newAuthor, setNewAuthor] = useState<Author>({ name: '', id: '' });
	const [authorList, setAuthorList] = useState<Author[]>(mockedAuthorsList);
	const [courseAuthorList, setcourseAuthorList] = useState<Author[]>([]);
	const navigate = useNavigate();

	const createCourse = () => {
		if (
			inputTitle.length < 1 ||
			inputDescription.length < 2 ||
			!inputDuration ||
			courseAuthorList.length < 1
		) {
			alert('Please, fill in all fields');
			return;
		}

		newAuthorList([...courseAuthorList, ...authorList]);
		createNewCourse({
			id: uuidv4(),
			title: inputTitle,
			description: inputDescription,
			creationDate: dateGenerator(),
			duration: Number(inputDuration),
			authors: courseAuthorList.map((author) => author.id),
		});
		navigate('/courses');
	};

	const onDurationChange = (inputDuration: string) => {
		if (isNaN(Number(inputDuration))) {
			setInputDuration('');
			return;
		}

		setInputDuration(inputDuration);
	};

	const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value;

		if (text.length < 2) {
			return;
		}

		setInputDescription(text);
	};

	const onTitleChange = (title: string) => {
		setInputTitle(title);
	};

	const onAuthorChange = (author: string) => {
		const newAuthor = {
			id: uuidv4(),
			name: author,
		};
		setNewAuthor(newAuthor);
	};

	const createAuthor = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!newAuthor.name || newAuthor.name.length < 2) {
			return;
		}

		setAuthorList([...authorList, newAuthor]);
	};

	const addAuthor = useCallback(
		(id: string) => {
			const author = authorList.filter((author) => author.id === id);
			setcourseAuthorList([...courseAuthorList, ...author]);

			const listAuthors = authorList.filter((author) => author.id !== id);
			setAuthorList(listAuthors);
		},
		[authorList, courseAuthorList]
	);

	const deleteAuthor = useCallback(
		(id: string) => {
			const author = courseAuthorList.filter((author) => author.id === id);
			setAuthorList([...authorList, ...author]);

			const listCourseAuthors = courseAuthorList.filter(
				(author) => author.id !== id
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
					<Button buttonText={BUTTON_CREATE} onButtonClick={createCourse} />
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
							onButtonClick={createAuthor}
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
}

export default CreateCourse;
