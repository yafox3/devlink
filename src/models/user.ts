import { IDevCard } from '.'

export interface IUserData {
	email: string
	password: string
}

export interface IUser {
	email: string
	firstName?: string
	lastName?: string
	img: string
	devCards: IDevCard[]
}