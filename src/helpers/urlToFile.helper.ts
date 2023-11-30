export const urlToFile = async (url: string, filename: string): Promise<File> => {
	const response = await fetch(url);
	const data = await response.blob();
	return new File([data], filename, {type: data.type});
}