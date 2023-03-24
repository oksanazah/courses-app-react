import type { User } from './helpers';

interface AuthPops {
	result: string;
	successful: boolean;
	user?: User;
	errors?: string[];
}

const auth = async (user: User, url: string): Promise<AuthPops | undefined> => {
	const response: Response = await fetch(`http://localhost:4000/${url}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result: AuthPops = await response.json();

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
