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
}

export { Course, Author, User };
