import { mockedAuthorsList } from '../../../constants';
import { pipeDuration } from '../../../helpers';

function CourseDetail({
	course: { title, description, id, duration, creationDate, authors },
}) {
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
								const auth = mockedAuthorsList.find(
									(mockedAuthor) => mockedAuthor.id === author
								);
								return <li key={auth.id}>{auth.name}</li>;
							})}
						</ul>
					</ul>
				</div>
			</div>
		</>
	);
}

export default CourseDetail;