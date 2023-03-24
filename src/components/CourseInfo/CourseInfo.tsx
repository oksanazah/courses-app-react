import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import CourseDetail from './components/CourseDetail';
import { getCourseInfo } from '../../services';
import type { Course, CourseInfoResponse } from '../../helpers';

import './course-info.css';

const CourseInfo: React.FC = () => {
	const [course, setCourse] = useState<Course>();
	const { courseId } = useParams<string>();

	useEffect(() => {
		if (courseId) {
			getCourseInfo(courseId).then((data: CourseInfoResponse): void => {
				if (data.successful) {
					setCourse(data.result);
				}
			});
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
