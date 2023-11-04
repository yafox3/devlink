import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

interface ProtectedRoutesProps extends PropsWithChildren {
	redirectPath: string
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children, redirectPath }) => {
	const { isAuth } = useAuth()
	
	if (!isAuth) {
		return <Navigate to={redirectPath} replace />
	}

	return children
}

export { ProtectedRoutes }
