import type { User } from './helpers';

const auth = async (user: User, url: string) => {
	const response = await fetch(`http://localhost:4000/${url}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();

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

export { auth };
