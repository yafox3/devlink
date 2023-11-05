import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage()}`
	}
})

export { instance as axios }

