import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { pipeDuration } from '../../../helpers';
import { selectAuthors, useAppDispatch } from '../../../store';
import { getAuthorsThunk } from '../../../store/authors/thunk';
import type { Author } from '../../../helpers';

interface CourseDetailProps {
	course: {
		title: string;
		description: string;
		id: string;
		duration: number;
		creationDate: string;
		authors: string[];
	};
}

const CourseDetail: React.FC<CourseDetailProps> = ({
	course: { title, description, id, duration, creationDate, authors },
}) => {
	const dispatch = useAppDispatch();
	const authorList: Author[] = useSelector(selectAuthors);

	useEffect((): void => {
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	return (
		<>
			<h1>{title}</h1>
			<div className='course-info-detailed'>
				<div>
					<p>{description}</p>
				</div>
				<div>
					<ul>
						<li>
							<span>ID: </span>
							{id}
						</li>
						<li>
							<span>Duration: </span>
							{pipeDuration(duration)} hours
						</li>
						<li>
							<span>Created: </span>
							{creationDate}
						</li>
						<li>
							<span>Authors: </span>
						</li>
						<ul className='authors'>
							{authors.map((author) => {
								const auth = authorList.find(
									(mockedAuthor) => mockedAuthor.id === author
								);
								return <li key={auth?.id}>{auth?.name}</li>;
							})}
						</ul>
					</ul>
				</div>
			</div>
		</>
	);
};

export default CourseDetail;
