import { GET_AUTHORS, CREATE_AUTHOR } from './actionTypes';
import { getAuthorsList } from '../../services';
import type { Author, AuthorResponse } from '../../helpers';

interface AuthorAction {
	type: string;
	payload: Author[];
}

export const getAuthors = (): Promise<AuthorAction> => {
	const res = getAuthorsList().then(
		(data: AuthorResponse): AuthorAction => ({
			type: GET_AUTHORS,
			payload: data.result,
		})
	);

	return res;
};

export const createAuthor = (
	author: Author
): { type: string; payload: Author } => ({
	type: CREATE_AUTHOR,
	payload: author,
});
