import { ReactElement } from 'react'

export interface IRoute {
	index?: boolean
	path: string
	element: ReactElement
}