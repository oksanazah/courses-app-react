import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom';

import CourseForm from '../components/CourseForm';
import CourseInfo from '../components/CourseInfo';
import Courses from '../components/Courses';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import Registration from '../components/Registration';
import { loader } from './loader';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/registration' element={<Registration />} />
			<Route path='/login' element={<Login />} />
			<Route path='/courses' element={<Courses />} />
			<Route path='/courses/:courseId' element={<CourseInfo />} />
			<Route
				path='/courses/add'
				element={
					<PrivateRoute>
						<CourseForm />
					</PrivateRoute>
				}
				loader={loader}
			/>
			<Route
				path='/courses/update/:courseId'
				element={
					<PrivateRoute>
						<CourseForm />
					</PrivateRoute>
				}
				loader={loader}
			/>
			<Route path='*' element={<Navigate to='/login' />} />
		</>
	)
);

export { router };
