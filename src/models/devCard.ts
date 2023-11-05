import { ILink } from './link'

export interface IDevCard {
	id: number
	links: ILink[]
	img: string
	email: string
	firstName: string
	lastName: string
	viewsCount: number
}