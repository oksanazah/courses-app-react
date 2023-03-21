import { Link, useParams } from 'react-router-dom';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { pipeDuration } from '../../helpers';

import './course-info.css';

function CourseInfo() {
	const { courseId } = useParams();
	const course = mockedCoursesList.find((course) => course.id === courseId);

	return (
		<div className='course-info'>
			<Link to={'/courses'}>
				<span>&#60;</span> Back to courses
			</Link>
			<h1>{course.title}</h1>
			<div className='course-info-detailed'>
				<div>
					<p>{course.description}</p>
				</div>
				<div>
					<ul>
						<li>
							<span>ID: </span>
							{course.id}
						</li>
						<li>
							<span>Duration: </span>
							{pipeDuration(course.duration)} hours
						</li>
						<li>
							<span>Created: </span>
							{course.creationDate}
						</li>
						<li>
							<span>Authors: </span>
						</li>
						<ul className='authors'>
							{course.authors.map((author) => {
								for (let mockedAuthor of mockedAuthorsList) {
									if (mockedAuthor.id === author) {
										return <li key={mockedAuthor.id}>{mockedAuthor.name}</li>;
									}
								}
								return null;
							})}
						</ul>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
