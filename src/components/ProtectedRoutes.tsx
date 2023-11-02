import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuth } from '../router/router'

interface ProtectedRoutesProps extends PropsWithChildren {
	redirectPath: string
} 

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children, redirectPath }) => {
	if (!isAuth) {
		return <Navigate to={redirectPath} replace/>
	}

	return children
}

export { ProtectedRoutes }

