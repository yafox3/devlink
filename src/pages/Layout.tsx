import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/'

const Layout: FC = () => {
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
