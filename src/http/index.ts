import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use((config) => {
	const token = getTokenFromLocalStorage()
	config.headers.Authorization = `Bearer ${token}`
	return config
})

export { instance as axios }

