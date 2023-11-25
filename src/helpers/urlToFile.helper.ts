export const urlToFile = async (url: string, filename: string = 'image', mimeType: string = 'image/png') => {
	const res = await fetch(url);
	const blob = await res.blob();
	return new File([blob], filename, {type: mimeType});
}