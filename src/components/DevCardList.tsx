import { FC } from 'react'
import { IDevCard } from '../models'
import { DevCardItem } from './'

interface DevCardListProps {
	devCards: IDevCard[]
}

const DevCardList: FC<DevCardListProps> = ({ devCards }) => {
	return (
		<div className='flex flex-col gap-4 mb-10'>
			{devCards.map(card => (
				<DevCardItem key={card.id} devCard={card} />
			))}
		</div>
	)
}

export { DevCardList }
