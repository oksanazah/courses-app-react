import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAuthors } from '../../../store/authors/actionCreators';
import { pipeDuration } from '../../../helpers';
import type { RootState } from '../../../App';
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

const selectAuthors = (state: RootState): Author[] => state.authors;

const CourseDetail: React.FC<CourseDetailProps> = ({
	course: { title, description, id, duration, creationDate, authors },
}) => {
	const dispatch = useDispatch();
	const authorList: Author[] = useSelector(selectAuthors);

	useEffect((): void => {
		getAuthors().then((data) => dispatch(data));
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
