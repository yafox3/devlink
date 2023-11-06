import { useAppSelector } from '.'

export const useAuth = () => {
	const email = useAppSelector(state => state.auth.email)

	return {
		isAuth: !!email	
		// isAuth: true
	}
}