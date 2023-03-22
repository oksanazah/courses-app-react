function pipeDuration(number: number): string {
	const hours = Math.floor(number / 60);
	const minutes = number % 60;

	let hoursToString: string = hours < 10 ? `0${hours}` : `${hours}`;
	let minutesToString: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${hoursToString}:${minutesToString}`;
}

export { pipeDuration };
