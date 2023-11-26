import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DevCardList } from '../components'
import { useAppSelector } from '../hooks'
import { IDevCard } from '../models'

const Dashboard: FC = () => {
	const [devCards, setDevCards] = useState<IDevCard[]>([])
	const userDevCards = useAppSelector(state => state.user.user.devCards)
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
			<DevCardList devCards={devCards} />
			<button className='btn block mx-auto' onClick={createLinkHandler}>
				Create link
			</button>
		</div>
	)
}

export { Dashboard }

