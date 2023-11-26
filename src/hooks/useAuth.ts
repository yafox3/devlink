import { useAppSelector } from '.'

export const useAuth = () => {
	const token = useAppSelector(state => state.auth.token)

	return {
		isAuth: !!token
	}
}