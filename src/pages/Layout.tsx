import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/'
import { useAppDispatch } from '../hooks'
import { authCheck } from '../store/slices/authSlice'

const Layout: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authCheck())
	}, [dispatch])

	return (
		<div className='min-h-screen bg-white font-poppins'>
			<Header />
			<div className='container'>
				<Outlet />
			</div>
		</div>
	)
}

export { Layout }

