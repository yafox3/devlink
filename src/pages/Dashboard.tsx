import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DevCardList, Spinner } from '../components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { IDevCard, Statuses } from '../models'
import { getUserCards } from '../store/slices/userSlice'

const Dashboard: FC = () => {
	const [devCards, setDevCards] = useState<IDevCard[]>([])
	const userDevCards = useAppSelector(state => state.user.user.devCards)
	const status = useAppSelector(state => state.user.status)
	const dispatch = useAppDispatch()
	const isLoading = status === Statuses.LOADING
	const navigate = useNavigate()

	useEffect(() => {
		userDevCards.length || dispatch(getUserCards())
	}, [])

	useEffect(() => {
		setDevCards(userDevCards)
	}, [userDevCards])

	const createLinkHandler = () => {
		navigate(`/editor/new`)
	}

	return (
		<div className='py-10'>
			<h1 className='title mb-16'>Links</h1>
			{isLoading ? (
				<div className='w-10 h-10 mx-auto mb-16'>
					<Spinner className='w-10 h-10 dark:fill-blue-600 dark:text-black/5 fill-blue-600 text-black/5' />
				</div>
			) : devCards.length ? (
				<DevCardList devCards={devCards} />
			) : (
				<p className='text-center text-2xl mb-16'>Nothing found</p>
			)}

			<button disabled={isLoading} className='btn block mx-auto' onClick={createLinkHandler}>
				Create link
			</button>
		</div>
	)
}

export { Dashboard }

