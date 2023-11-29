import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DevCardList, Spinner } from '../components'
import { useAppSelector } from '../hooks'
import { IDevCard, Statuses } from '../models'

const Dashboard: FC = () => {
	const [devCards, setDevCards] = useState<IDevCard[]>([])
	const userDevCards = useAppSelector(state => state.user.user.devCards)
	const status = useAppSelector(state => state.user.status)
	const isLoading = status === Statuses.LOADING
	const navigate = useNavigate()

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
			) : (
				<DevCardList devCards={devCards} />
			)}

			<button disabled={isLoading} className='btn block mx-auto' onClick={createLinkHandler}>
				Create link
			</button>
		</div>
	)
}

export { Dashboard }

