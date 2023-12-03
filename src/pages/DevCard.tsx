import { AxiosResponse, isAxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { base64ToImg, platformToTSX } from '../helpers'
import { axios } from '../http'
import { IDevCard, Platforms } from '../models'

const DevCard: FC = () => {
	const { id } = useParams()
	const [devCard, setDevCard] = useState<IDevCard>({
		email: '',
		firstName: '',
		img: '',
		lastName: '',
		title: '',
		url: '',
		views: 0,
		links: [
			{ id: 1, url: '', platform: Platforms.NONE },
			{ id: 2, url: '', platform: Platforms.NONE },
			{ id: 3, url: '', platform: Platforms.NONE }
		]
	})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchDevCard = async () => {
			try {
				setIsLoading(true)
				const { data }: AxiosResponse<IDevCard> = await axios.get(`/card/get/${id}`)
				setDevCard(data)
			} catch (error) {
				if (isAxiosError(error)) {
					setError(error.response?.data)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchDevCard()
	}, [id])

	if (error) {
		toast.error(error)
		return <Navigate to='/' />
	}

	if (isLoading) {
		return (
			<div className='mt-16'>
				<div className='mb-4 w-36 h-36 mx-auto rounded-full bg-black/10 animate-pulse'></div>
				<div className='h-3 bg-black/10 rounded-full w-48 mb-4 mx-auto animate-pulse'></div>
				<div className='h-2.5 bg-black/10 rounded-full w-24 mb-14 mx-auto animate-pulse'></div>
				<div className='flex flex-col items-center gap-6'>
					<div className='h-14 w-64 bg-black/10 rounded-2xl animate-pulse'></div>
					<div className='h-14 w-64 bg-black/10 rounded-2xl animate-pulse'></div>
					<div className='h-14 w-64 bg-black/10 rounded-2xl animate-pulse'></div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col max-w-xs mx-auto min-h-screen select-none px-4'>
			<div className='mt-16 flex-1'>
				<img
					className='mb-4 w-36 h-36 object-cover mx-auto rounded-full'
					src={base64ToImg(devCard.img)}
					alt='devlink avatar'
				/>
				<p className='text-center font-bold text-2xl mb-2'>
					<span>{devCard.firstName}</span> <span>{devCard.lastName}</span>
				</p>
				<a
					href={`mailto:${devCard.email}`}
					className='block text-center text-lg text-black/75 mb-12'>
					{devCard.email}
				</a>
				<div className='flex flex-col items-center gap-6'>
					{devCard.links.map(link => (
						<a href={link.url} target='_blank' key={link.id} className='text-base w-full'>
							{platformToTSX(link.platform)}
						</a>
					))}
				</div>

				<div className='fixed -top-24 -left-24 -z-10 w-[400px] h-36 -rotate-12 rounded-full bg-blue-600'></div>
				<div className='fixed -bottom-24 -right-24 -z-10 w-[400px] h-36 -rotate-12 rounded-full bg-red-600'></div>
			</div>

			<a href={`${window.location.origin}/`} target='_blank' className='text-center text-gray-400 font-bold py-2'>Made by devlink &copy;</a>
		</div>
	)
}

export { DevCard }

