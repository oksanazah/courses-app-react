const pipeDuration = (number: number): string => {
	const hours: number = Math.floor(number / 60);
	const minutes: number = number % 60;

	let hoursToString: string = hours < 10 ? `0${hours}` : `${hours}`;
	let minutesToString: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${hoursToString}:${minutesToString}`;
};

export { pipeDuration };
