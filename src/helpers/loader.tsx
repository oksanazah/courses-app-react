import { getUser } from '../services';

const loader = async () => {
	const token = localStorage.getItem('token');

	if (token) {
		const data = await getUser(token);

		return data;
	}

	return null;
};

export { loader };
