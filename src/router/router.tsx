import { createBrowserRouter } from 'react-router-dom'
import { IRoute } from '../models/route'
import { Auth, Dashboard, DevCard, Editor, ErrorPage, Home, Layout, Profile } from '../pages'

// temp variable
export const isAuth = true

const publicRoutes: IRoute[] = [
	{
		index: true,
		path: '/',
		element: <Home />
	},
	{
		path: 'auth',
		element: <Auth />
	}
]

const privateRoutes: IRoute[] = [
	{
		index: true,
		path: '/',
		element: <Dashboard />
	},
	{
		path: 'profile',
		element: <Profile />
	},
	{
		path: 'editor',
		element: <Editor />
	}
]

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: isAuth ? privateRoutes : publicRoutes
	},
	{
		path: 'devcard/:id',
		element: <DevCard />
	}
])
