import { FC } from 'react'
import { FaRegCopy, FaRegEye, FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { copyToClipboard } from '../helpers'
import { IDevCard } from '../models'

interface DevCardItemProps {
	devCard: IDevCard
}

const DevCardItem: FC<DevCardItemProps> = ({ devCard }) => {
	const navigate = useNavigate()

	const toEditor = () => {
		navigate(`/editor/${devCard.url}`)
	}

	return (
		<div className='w-full flex justify-between py-3.5 px-8 rounded-2xl border border-black/15 shadow-md shadow-black/25 max-w-3xl mx-auto'>
			<div className='flex gap-4 items-center'>
				<img src={devCard.img} alt={`${devCard.firstName} avatar`} className='rounded-full w-14' />
				<p className='text-lg'>
					{devCard.firstName} {devCard.lastName}
				</p>
			</div>
			<div className='flex gap-4 items-center '>
				<div className='flex items-center gap-1.5 text-black/50 text-sm'>
					<FaRegEye />
					<p>{devCard.viewsCount}</p>
				</div>

				<div className='flex items-center gap-4 text-xl'>
					<FaRegCopy
						className='text-black cursor-pointer'
						onClick={() => copyToClipboard(`${window.location.origin}/devcard/${devCard.url}`)}
					/>
					<FaRegPenToSquare className='text-black cursor-pointer' onClick={toEditor} />
					<FaRegTrashCan className='text-red-600 cursor-pointer' />
				</div>
			</div>
		</div>
	)
}

export { DevCardItem }
