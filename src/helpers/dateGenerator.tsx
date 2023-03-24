const dateGenerator = (): string => {
	const date: Date = new Date();
	const day: number = date.getDate();
	const month: number = date.getMonth() + 1;

	return `${day}/${month}/${date.getFullYear()}`;
};

export { dateGenerator };
