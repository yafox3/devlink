import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
	return <div className='min-h-screen font-poppins flex flex-col justify-center items-center select-none'>
		<span className='text-[14rem] mb-36'>😔</span>
		<p className='text-4xl mb-8'>
			Page not found!
		</p>
		<Link to='/' className='btn'>Go back</Link>
	</div>
}

export { ErrorPage }
