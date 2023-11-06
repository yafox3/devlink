import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Loader } from '../components/'
import { useAppDispatch, useAppSelector } from '../hooks'
import { authCheck } from '../store/slices/authSlice'

const Layout: FC = () => {
	const dispatch = useAppDispatch()
	const isDataReceived = useAppSelector(state => state.auth.isDataReceived)

	useEffect(() => {
		dispatch(authCheck())
	}, [dispatch])

	if (!isDataReceived) {
		return <Loader />
	}

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

