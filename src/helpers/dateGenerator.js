function dateGenerator() {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;

	return `${day}/${month}/${date.getFullYear()}`;
}

export { dateGenerator };
