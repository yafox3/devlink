import { FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Input, Spinner } from '../components'
import { toastByStatus } from '../helpers/toastByStatus'
import { useAppDispatch, useAppSelector, useAuth } from '../hooks'
import { Statuses } from '../models/statuses'
import { IUserData } from '../models/user'
import { authLogin, authSignUp } from '../store/slices/authSlice'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const dispatch = useAppDispatch()
	const status: Statuses = useAppSelector(state => state.auth.status)
	const error = useAppSelector(state => state.auth.error)
	const { isAuth } = useAuth()
	const [userData, setUserData] = useState<IUserData>({
		email: 'aye@mail.ru',
		password: '123456'
	})

	const toggleLogin = (event: React.MouseEvent<HTMLHyperlinkElementUtils>) => {
		event.preventDefault()
		setIsLogin(prev => !prev)
	}

	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const response = await dispatch(authLogin(userData))

		toastByStatus(response.type, { success: 'Login successful!', error: 'Login failed!' })
	}

	const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const response = await dispatch(authSignUp(userData))

		toastByStatus(response.type, { success: 'Account has been created!', error: 'Something went wrong!' })
	}

	if (isAuth) {
		return <Navigate to='/dashboard' />
	}

	return (
		<div className='py-10 max-w-[400px] w-full mx-auto'>
			<h1 className='title mb-10'>{isLogin ? 'Login' : 'Sign up'}</h1>

			<form
				id='auth'
				action='submit'
				className='flex flex-col items-center gap-4 mb-5'
				onSubmit={isLogin ? loginHandler : signUpHandler}>
				<Input
					required
					disabled={status === Statuses.LOADING}
					type='email'
					placeholder='Enter your email here'
					label='Email'
					className='w-full disabled:bg-gray-100'
					value={userData.email}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setUserData({ ...userData, email: event.target.value })
					}
				/>
				<Input
					required
					disabled={status === Statuses.LOADING}
					type='password'
					placeholder='Enter your password here'
					label='Password'
					className='w-full disabled:bg-gray-100'
					value={userData.password}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setUserData({ ...userData, password: event.target.value })
					}
				/>
			</form>

			{error && <p className='text-center text-red-600 mb-3'>Error: {error}</p>}

			<a
				href='#'
				className='cursor-pointer text-sm text-center block underline text-black/40 mb-6'
				onClick={toggleLogin}>
				{isLogin ? 'Don’t have an account?' : 'Already have an account?'}
			</a>
			
			<button
				className='btn px-14 block mx-auto'
				form='auth'
				disabled={status === Statuses.LOADING}>
				{status === Statuses.LOADING ? <Spinner /> : isLogin ? 'Login' : 'Sign up'}
			</button>
		</div>
	)
}

export { Auth }

