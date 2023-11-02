import axios from '../http'
import { IUser, IUserData } from '../models/user'

export class AuthService {
	static async login(user: IUserData) {
		const { data } = await axios.post<IUser>('auth/authenticate', user)
		return data
	}

	static async register(user: IUserData) {
		const { data } = await axios.post<IUser>('auth/register', user)
		return data
	}
}