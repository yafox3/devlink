import { createBrowserRouter } from 'react-router-dom'
import { Auth, Dashboard, DevCard, Editor, ErrorPage, Home, Layout, Profile } from '../pages'
import { ProtectedRoutes } from '../components'

// temp variable
export const isAuth = true

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />
			},
			{
				path: 'auth',
				element: <Auth />
			},
			{
				path: 'dashboard',
				element: (
					<ProtectedRoutes redirectPath='/auth'>
						<Dashboard />
					</ProtectedRoutes>
				)
			},
			{
				path: 'profile',
				element: (
					<ProtectedRoutes redirectPath='/auth'>
						<Profile />
					</ProtectedRoutes>
				)
			},
			{
				path: 'editor',
				element: (
					<ProtectedRoutes redirectPath='/auth'>
						<Editor />
					</ProtectedRoutes>
				)
			},
			{
				path: 'devcard/:id',
				element: <DevCard />
			}
		]
	}
])
