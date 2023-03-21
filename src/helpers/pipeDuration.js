function pipeDuration(number) {
	let hours = Math.floor(number / 60);
	let minutes = number % 60;

	if (hours < 10) {
		hours = `0${hours}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes}`;
}

export { pipeDuration };
