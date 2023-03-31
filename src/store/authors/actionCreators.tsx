import { GET_AUTHORS, CREATE_AUTHOR } from './actionTypes';
import type { Author, AuthorResponse } from '../../helpers';

interface AuthorAction {
	type: string;
	payload: Author[] | undefined;
}

export const getAuthors = (data: AuthorResponse): AuthorAction => ({
	type: GET_AUTHORS,
	payload: data.result,
});

export const createAuthor = (
	author: Author
): { type: string; payload: Author } => ({
	type: CREATE_AUTHOR,
	payload: author,
});
