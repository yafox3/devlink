export const base64ToImg = (base64: string) => {
	const byteCharacters = atob(base64)
	const byteNumbers = new Array(byteCharacters.length)

	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}

	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray])

	const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

	return URL.createObjectURL(file)
}
