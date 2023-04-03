interface Author {
	id: string;
	name: string;
}

interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

interface User {
	name?: string;
	email: string;
	password?: string;
	isAuth?: boolean;
	token?: string;
	id?: string;
	role?: string;
}

interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

interface AuthResponse {
	result?: string;
	successful: boolean;
	user?: User;
	errors?: string[];
}

interface UserResponse {
	result: User;
	successful: boolean;
}

interface CourseResponse {
	result: Course[];
	successful: boolean;
}

interface CourseInfoResponse {
	result: Course;
	successful: boolean;
}

interface AuthorResponse {
	result: Author[];
	successful: boolean;
}

interface NewAuthorResponse {
	result: Author;
	successful: boolean;
}

interface DeleteResponse {
	result?: string;
	successful: boolean;
}

export {
	Course,
	Author,
	User,
	UserState,
	UserResponse,
	AuthResponse,
	CourseResponse,
	AuthorResponse,
	NewAuthorResponse,
	CourseInfoResponse,
	DeleteResponse,
};
