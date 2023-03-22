import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button';
import { BUTTON_SHOW } from '../../../../constants';
import { pipeDuration } from '../../../../helpers';
import type { Course } from '../../../../helpers';

import './course-card.css';

interface CourseCardParams {
	course: Course;
	authorNames: (string | null)[];
}

function CourseCard({ course, authorNames }: CourseCardParams) {
	const { id, title, description, creationDate, duration } = course;
	const authorString: string = authorNames.join(', ');
	const navigate = useNavigate();

	const onButtonClick = () => {
		navigate(`/courses/${id}`);
	};

	return (
		<article className='course-card'>
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div>
				<ul>
					<li>
						<span>Authors: </span>
						{authorString}
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
						<Button buttonText={BUTTON_SHOW} onButtonClick={onButtonClick} />
					</li>
				</ul>
			</div>
		</article>
	);
}

export default CourseCard;
