export const getTokenFromLocalStorage = (): string => {
	const token = localStorage.getItem('token') || ''
	return token
}

export const setTokenToLocalStorage = (token: string): void => {
	localStorage.setItem('token', token)
}

export const removeTokenFromLocalStorage = (): void => {
	localStorage.removeItem('token')
}