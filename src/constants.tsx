const BUTTON_LOGOUT = 'Logout';
const BUTTON_SHOW = 'Show course';
const BUTTON_SEARCH = 'Search';
const BUTTON_ADD = 'Add new course';
const BUTTON_CREATE = 'Create course';
const BUTTON_UPDATE = 'Update course';
const BUTTON_CREATE_AUTHOR = 'Create author';
const BUTTON_ADD_AUTHOR = 'Add author';
const BUTTON_DELETE_AUTHOR = 'Delete author';
const BUTTON_REGISTRATION = 'Registration';
const BUTTON_LOGIN = 'Login';
const SEARCH_ID = 'search';
const SEARCH_PLACEHOLDER = 'Enter course name or id...';
const TITLE_ID = 'title';
const TITLE_LABEL = 'Title';
const TITLE_PLACEHOLDER = 'Enter title...';
const AUTHOR_ID = 'author';
const AUTHOR_LABEL = 'Author name';
const AUTHOR_PLACEHOLDER = 'Enter author name...';
const DURATION_ID = 'duration';
const DURATION_LABEL = 'Duration';
const DURATION_PLACEHOLDER = 'Enter duration in minutes...';
const DESCRIPTION_ID = 'description';
const DESCRIPTION_PLACEHOLDER = 'Enter description';
const USER_NAME_ID = 'name';
const USER_NAME_LABEL = 'Name';
const USER_NAME_PLACEHOLDER = 'Enter name';
const USER_EMAIL_ID = 'email';
const USER_EMAIL_LABEL = 'Email';
const USER_EMAIL_PLACEHOLDER = 'Enter email';
const USER_PASSWORD_ID = 'password';
const USER_PASSWORD_LABEL = 'Password';
const USER_PASSWORD_PLACEHOLDER = 'Enter password';
const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u nchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];
const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [
		{
			id: '1',
			title: 'title',
			description: 'description',
			creationDate: '3/4/2023',
			duration: 120,
			authors: ['author', 'author2'],
		},
		{
			id: '2',
			title: 'title2',
			description: 'description2',
			creationDate: '3/4/2023',
			duration: 90,
			authors: ['author1', 'author3'],
		},
	],
	authors: [{ id: 'id1' }, { id: 'id2' }],
};

const mockedState2 = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [],
};

export {
	BUTTON_LOGOUT,
	BUTTON_SHOW,
	BUTTON_SEARCH,
	BUTTON_ADD,
	BUTTON_CREATE,
	BUTTON_UPDATE,
	BUTTON_CREATE_AUTHOR,
	BUTTON_ADD_AUTHOR,
	BUTTON_DELETE_AUTHOR,
	BUTTON_REGISTRATION,
	BUTTON_LOGIN,
	mockedCoursesList,
	mockedAuthorsList,
	mockedState,
	mockedState2,
	SEARCH_PLACEHOLDER,
	SEARCH_ID,
	TITLE_ID,
	TITLE_LABEL,
	TITLE_PLACEHOLDER,
	AUTHOR_ID,
	AUTHOR_LABEL,
	AUTHOR_PLACEHOLDER,
	DURATION_ID,
	DURATION_LABEL,
	DURATION_PLACEHOLDER,
	DESCRIPTION_ID,
	DESCRIPTION_PLACEHOLDER,
	USER_NAME_ID,
	USER_NAME_LABEL,
	USER_NAME_PLACEHOLDER,
	USER_EMAIL_ID,
	USER_EMAIL_LABEL,
	USER_EMAIL_PLACEHOLDER,
	USER_PASSWORD_ID,
	USER_PASSWORD_LABEL,
	USER_PASSWORD_PLACEHOLDER,
};
