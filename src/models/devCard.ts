import { ILink } from './link'

export interface IDevCard {
	url: string
	links: ILink[]
	img: string
	email: string
	firstName: string
	lastName: string
	viewsCount: number
}