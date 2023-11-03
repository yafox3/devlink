import { FC, useState } from 'react'
import { Input } from '../components'
import { IUserData } from '../models/user'
import { AuthService } from '../services/auth.service'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [userData, setUserData] = useState<IUserData>({
		email: '',
		password: ''
	})

	const toggleLogin = (event: React.MouseEvent<HTMLHyperlinkElementUtils>) => {
		event.preventDefault()
		setIsLogin(prev => !prev)
	}

	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			const user = await AuthService.login(userData)
			toast('You have successfully logged in!')
			console.log(user)
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.message)
			}
		}
	}

	const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			const user = await AuthService.register(userData)
			toast('Account has been created!')
			console.log(user)
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.message)
			}
		}
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
					value={userData.email || 'test254c@mail.ru'} // temp decision
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, email: event.target.value})}
				/> 
				<Input
					required
					type='password'
					placeholder='Enter your password here'
					label='Password'
					className='w-full'
					value={userData.password || '123456'} // temp decision
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: event.target.value})}
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

