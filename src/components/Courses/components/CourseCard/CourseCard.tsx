import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../../../../common/Button';
import { BUTTON_SHOW } from '../../../../constants';
import { pipeDuration } from '../../../../helpers';
import { deleteCourseThunk } from '../../../../store/courses/thunk';
import { useAppDispatch, selectUser } from '../../../../store';
import type { Course } from '../../../../helpers';

import './course-card.css';

interface CourseCardParams {
	course: Course;
	authorNames: (string | null)[];
}

const CourseCard: React.FC<CourseCardParams> = ({ course, authorNames }) => {
	const { id, title, description, creationDate, duration } = course;
	const authorString: string = authorNames.join(', ');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);

	const showCourse = (): void => {
		navigate(`/courses/${id}`);
	};

	const onDelete = (): void => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(deleteCourseThunk(id, token));
		}
	};

	const onUpdate = (): void => {
		navigate(`/courses/update/${id}`);
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
					<li className='btns'>
						<Button buttonText={BUTTON_SHOW} onButtonClick={showCourse} />
						{user.role === 'admin' ? (
							<span className='btn-icons'>
								<Button
									buttonText={<i className='fa-solid fa-pen'></i>}
									onButtonClick={onUpdate}
								/>
								<Button
									buttonText={<i className='fa-solid fa-trash'></i>}
									onButtonClick={onDelete}
								/>
							</span>
						) : null}
					</li>
				</ul>
			</div>
		</article>
	);
};

export default CourseCard;
