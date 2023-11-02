import { FC, useState } from 'react'
import { Input } from '../components'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const toggleLogin = (event: React.MouseEvent<HTMLHyperlinkElementUtils>) => {
		event.preventDefault()
		setIsLogin(prev => !prev)
	}

	const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(user, 'you was attempted login')
	}

	const signUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(user, 'you was attempted signup')
	}
	
	return (
		<div className='py-10 max-w-[400px] w-full mx-auto'>
			<h1 className='title mb-10'>{isLogin ? 'Login' : 'Sign up'}</h1>

			<form 
				id='auth' 
				action='submit' 
				className='flex flex-col items-center gap-4 mb-5'
				onSubmit={isLogin ? loginHandler : signUpHandler}
			>
				<Input
					required
					type='email'
					placeholder='Enter your email here'
					label='Email'
					className='w-full'
					value={user.email}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser({...user, email: event.target.value})}
				/> 
				<Input
					required
					type='password'
					placeholder='Enter your password here'
					label='Password'
					className='w-full'
					value={user.password}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser({...user, password: event.target.value})}
				/>
			</form>

			<a
				href='#'
				className='cursor-pointer text-sm text-center block underline text-black/40 mb-6'
				onClick={toggleLogin}>
				{isLogin ? 'Don’t have an account?' : 'Already have an account?'}
			</a>

			<button className='btn px-14 block mx-auto' form='auth'>
				{isLogin ? 'Login' : 'Sign up'}
			</button>
		</div>
	)
}

export { Auth }

