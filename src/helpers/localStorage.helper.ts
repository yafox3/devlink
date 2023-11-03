export const getTokenFromLocalStorage = (): string => {
	const data = localStorage.getItem('token')
	const token = data ? JSON.parse(data) : ''
	return token
}

export const setTokenToLocalStorage = (token: string): void => {
	localStorage.setItem('token', JSON.stringify(token))
}

export const removeTokenFromLocalStorage = (): void => {
	localStorage.removeItem('token')
}