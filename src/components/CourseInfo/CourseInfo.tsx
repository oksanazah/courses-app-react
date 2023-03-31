import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import CourseDetail from './components/CourseDetail';
import { getCourseInfo } from '../../services';
import type { Course } from '../../helpers';

import './course-info.css';

const CourseInfo: React.FC = () => {
	const [course, setCourse] = useState<Course>();
	const { courseId } = useParams<string>();

	useEffect((): void => {
		const token = localStorage.getItem('token');

		if (courseId && token) {
			const fetchCourseInfo = async (): Promise<void> => {
				const data = await getCourseInfo(courseId, token);

				if (data?.successful) {
					setCourse(data.result);
				}
			};

			fetchCourseInfo();
		}
	}, [courseId]);

	return (
		<div className='course-info'>
			<Link to={'/courses'}>
				<span>&#60;</span> Back to courses
			</Link>
			{course ? <CourseDetail course={course} /> : <h1>Course not found</h1>}
		</div>
	);
};

export default CourseInfo;
