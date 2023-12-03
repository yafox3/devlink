import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../hooks'

const Header: FC = () => {
	const { isAuth } = useAuth()

	return (
		<header className='h-20 shadow-md shadow-black/10'>
			<div className='container flex items-center pt-5'>
				<Link to='/dashboard' className='flex items-center'>
					<img src={logo} alt='logo' />
					<span className='text-3xl font-semibold text-blue-700 ml-1'>devlink</span>
				</Link>

				<nav className='ml-auto flex gap-10'>
					{isAuth ? (
						<>
							<NavLink
								to='/'
								className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
								Info
							</NavLink>
							<NavLink
								to='/dashboard'
								className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
								Dashboard
							</NavLink>
							<NavLink
								to='/profile'
								className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
								Profile
							</NavLink>
						</>
					) : (
						<>
							<NavLink
								to='/'
								className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
								Info
							</NavLink>
							<NavLink
								to='/auth'
								className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
								Login
							</NavLink>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}

export { Header }
