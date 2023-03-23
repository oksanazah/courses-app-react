import { Link, useParams } from 'react-router-dom';

import { mockedCoursesList } from '../../constants';
import CourseDetail from './components/CourseDetail';

import './course-info.css';

function CourseInfo() {
	const { courseId } = useParams();
	const course = mockedCoursesList.find((course) => course.id === courseId);

	return (
		<div className='course-info'>
			<Link to={'/courses'}>
				<span>&#60;</span> Back to courses
			</Link>
			{course ? <CourseDetail course={course} /> : <h1>Course not found</h1>}
		</div>
	);
}

export default CourseInfo;
