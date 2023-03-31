import type {
	User,
	UserResponse,
	AuthResponse,
	CourseResponse,
	AuthorResponse,
	CourseInfoResponse,
	DeleteResponse,
	Author,
	NewAuthorResponse,
	Course,
} from './helpers';

const auth = async (
	user: User,
	url: string
): Promise<AuthResponse | undefined> => {
	const response: Response = await fetch(`http://localhost:4000/${url}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result: AuthResponse = await response.json();

	if (!response.ok) {
		if (!result.errors) {
			alert('wrong password');
			return;
		}

		alert(result.errors);
		return;
	}

	return result;
};

const getUser = async (token: string): Promise<UserResponse | undefined> => {
	try {
		const response: Response = await fetch('http://localhost:4000/users/me', {
			headers: {
				Authorization: token,
			},
		});
		const user: Promise<UserResponse> = response.json();

		return user;
	} catch (error) {
		console.log(error);
	}
};

const logout = (token: string): void => {
	fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
};

const getCoursesList = async (): Promise<CourseResponse> => {
	try {
		const response: Response = await fetch('http://localhost:4000/courses/all');
		const coursesList: Promise<CourseResponse> = response.json();

		return coursesList;
	} catch (error) {
		return { result: [], successful: false };
	}
};

const getCourseInfo = async (
	id: string,
	token: string
): Promise<CourseInfoResponse | undefined> => {
	try {
		const response: Response = await fetch(
			`http://localhost:4000/courses/${id}`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
		const courseInfo: Promise<CourseInfoResponse> = response.json();

		return courseInfo;
	} catch (error) {
		console.log(error);
	}
};

const deleteCourse = async (
	id: string,
	token: string
): Promise<DeleteResponse> => {
	try {
		const response: Response = await fetch(
			`http://localhost:4000/courses/${id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			}
		);
		const result: Promise<DeleteResponse> = response.json();

		return result;
	} catch (error) {
		return { successful: false };
	}
};

const addCourse = async (
	course: Course,
	token: string
): Promise<CourseInfoResponse> => {
	try {
		const response: Response = await fetch(
			'http://localhost:4000/courses/add',
			{
				method: 'POST',
				body: JSON.stringify(course),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			}
		);
		const result: CourseInfoResponse = await response.json();

		return result;
	} catch (error) {
		return {
			result: {
				id: '',
				title: '',
				description: '',
				creationDate: '',
				duration: 0,
				authors: [],
			},
			successful: false,
		};
	}
};

const updateCourse = async (
	course: Course,
	id: string,
	token: string
): Promise<CourseInfoResponse> => {
	try {
		const response: Response = await fetch(
			`http://localhost:4000/courses/${id}`,
			{
				method: 'PUT',
				body: JSON.stringify(course),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			}
		);
		const result: CourseInfoResponse = await response.json();

		return result;
	} catch (error) {
		return {
			result: {
				id: '',
				title: '',
				description: '',
				creationDate: '',
				duration: 0,
				authors: [],
			},
			successful: false,
		};
	}
};

const getAuthorsList = async (): Promise<AuthorResponse> => {
	try {
		const response: Response = await fetch('http://localhost:4000/authors/all');
		const authorsList: Promise<AuthorResponse> = response.json();

		return authorsList;
	} catch (error) {
		return { result: [], successful: false };
	}
};

const addAuthor = async (
	author: Author,
	token: string
): Promise<NewAuthorResponse> => {
	try {
		const response: Response = await fetch(
			'http://localhost:4000/authors/add',
			{
				method: 'POST',
				body: JSON.stringify(author),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			}
		);
		const result: NewAuthorResponse = await response.json();

		return result;
	} catch (error) {
		return { result: { name: '', id: '' }, successful: false };
	}
};

export {
	auth,
	getCoursesList,
	getCourseInfo,
	getAuthorsList,
	addAuthor,
	getUser,
	logout,
	deleteCourse,
	addCourse,
	updateCourse,
};
