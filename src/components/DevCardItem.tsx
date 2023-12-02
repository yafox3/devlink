import { FC, useState } from 'react'
import { FaRegCopy, FaRegEye, FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '.'
import { base64ToImg, copyToClipboard } from '../helpers'
import { useAppDispatch } from '../hooks'
import { axios } from '../http'
import { IDevCard } from '../models'
import { getUserCards } from '../store/slices/userSlice'

interface DevCardItemProps {
	devCard: IDevCard
}

const DevCardItem: FC<DevCardItemProps> = ({ devCard }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)

	const toEditor = () => {
		navigate(`/editor/${devCard.url}`)
	}

	const deleteCard = async () => {
		if (window.confirm('Are you sure you want to delete this card?')) {
			try {
				setIsLoading(true)
				await axios.delete(`/card/${devCard.url}`)
				toast.success('Card deleted successfully!')
				dispatch(getUserCards())
			} catch {
				toast.error('Something went wrong, please try again later')
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className='w-full flex justify-between py-3.5 px-8 rounded-2xl border border-black/15 shadow-md shadow-black/25 max-w-3xl mx-auto'>
			<div className='flex gap-4 items-center'>
				<img
					src={base64ToImg(devCard.img)}
					alt={`${devCard.firstName} avatar`}
					className='rounded-full w-14 h-14 object-cover'
				/>
				<p className='text-lg'>{devCard.title}</p>
			</div>
			<div className='flex gap-4 items-center '>
				<div className='flex items-center gap-1.5 text-black/50 text-sm'>
					<FaRegEye />
					<p>{devCard.views}</p>
				</div>

				<div className='flex items-center gap-4 text-xl'>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<FaRegCopy
								className='text-black cursor-pointer'
								onClick={() => copyToClipboard(`${window.location.origin}/${devCard.url}`)}
							/>
							<FaRegPenToSquare className='text-black cursor-pointer' onClick={toEditor} />
							<FaRegTrashCan className='text-red-600 cursor-pointer' onClick={deleteCard} />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export { DevCardItem }

