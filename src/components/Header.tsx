import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Burger } from '.'
import logo from '../assets/logo.png'
import { useAuth } from '../hooks'

const Header: FC = () => {
	const { isAuth } = useAuth()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
	const navLinks = isAuth
		? [
				{
					to: '/',
					title: 'Info'
				},
				{
					to: '/dashboard',
					title: 'Dashboard'
				},
				{
					to: '/profile',
					title: 'Profile'
				}
			]
		: [
				{
					to: '/',
					title: 'Info'
				},
				{
					to: '/auth',
					title: 'Login'
				}
			]

	return (
		<header className='h-20 shadow-md shadow-black/10'>
			<div className='container flex items-center pt-5'>
				<Link to='/dashboard' className='flex items-center'>
					<img src={logo} alt='logo' />
					<span className='text-3xl font-semibold text-blue-700 ml-1'>devlink</span>
				</Link>

				{/* Desktop menu */}
				<nav className='ml-auto hidden gap-10 md:flex'>
					{navLinks.map(({ to, title }, index) => (
						<Link
							to={to}
							key={index}
							className='text-lg text-blue-700 font-semibold hover:text-blue-800 transition-colors'>
							{title}
						</Link>
					))}
				</nav>

				{/* Mobile menu */}
				<nav className='ml-auto md:hidden'>
					<Burger isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
					{isMobileMenuOpen && (
						<div
							className='fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/90 flex flex-col items-center justify-center gap-10'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							{navLinks.map(({ to, title }, index) => (
								<Link
									to={to}
									key={index}
									className='text-2xl text-white font-semibold hover:text-blue-800 transition-colors'>
									{title}
								</Link>
							))}
						</div>
					)}
				</nav>
			</div>
		</header>
	)
}

export { Header }

