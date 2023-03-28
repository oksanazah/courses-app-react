import type {
	User,
	AuthResponse,
	CourseResponse,
	AuthorResponse,
	CourseInfoResponse,
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
	id: string
): Promise<CourseInfoResponse | undefined> => {
	try {
		const response: Response = await fetch(
			`http://localhost:4000/courses/${id}`
		);
		const courseInfo: Promise<CourseInfoResponse> = response.json();

		return courseInfo;
	} catch (error) {
		console.log(error);
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

export { auth, getCoursesList, getCourseInfo, getAuthorsList };
