import { FC } from 'react'
import { Link } from 'react-router-dom'
import example from '../assets/images/home/example.jpg'
import { isAuth } from '../router/router'

const Home: FC = () => {
	return (
		<div className='flex flex-col py-10 items-center justify-center text-center'>
			<h1 className='title mb-8'>What is this?</h1>
			<p className='text-black text-lg mb-6'>
				Our service provides the ability to create template pages, with links to profiles in the
				developer's work networks. (GitHub, LinkedIn, YouTube are supported)
			</p>
			<img className='mb-8' src={example} alt="The devlink example" />
			<Link to={isAuth ? 'dashboard' : 'auth'} className='btn'>Get started</Link>
		</div>
	)
}

export { Home }

