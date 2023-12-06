import { AxiosResponse, isAxiosError } from 'axios'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DevCardPreview, ImageUpload, Input, Spinner } from '../components'
import { LinkItem } from '../components/LinkItem'
import { base64ToImg, isObjectFilled, urlToFile } from '../helpers'
import { useAppDispatch, useAppSelector } from '../hooks'
import { axios } from '../http'
import { IDevCard, ILink, Platforms, Statuses } from '../models'
import { getUser, getUserCards } from '../store/slices/userSlice'

const Editor: FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { user, status } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
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
	const userIsLoading = status === Statuses.LOADING
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [currentImage, setCurrentImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string>('')
	const [newLinkId, setNewLinkId] = useState<number>(3)
	const [isPreviewActive, setIsPreviewActive] = useState<boolean>(false)

	useEffect(() => {
		if (id === 'new' && !user.email) {
			dispatch(getUser())
		}
	}, [])

	useEffect(() => {
		setIsLoading(userIsLoading)
	}, [userIsLoading])

	useEffect(() => {
		if (id === 'new') {
			setDevCard({
				email: user.email,
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				img: user.img,
				title: '',
				url: '',
				views: 0,
				links: [
					{ id: 1, url: '', platform: Platforms.NONE },
					{ id: 2, url: '', platform: Platforms.NONE },
					{ id: 3, url: '', platform: Platforms.NONE }
				]
			})

			return
		}

		const fetchDevCard = async () => {
			try {
				setIsLoading(true)
				const response: AxiosResponse<IDevCard> = await axios.get(`/card/get/${id}`)
				setDevCard(() => response.data)
				setDevCard(prev => ({ ...prev, img: base64ToImg(prev.img) }))
			} catch (error) {
				if (isAxiosError(error)) {
					setError(error.response?.data)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchDevCard()
	}, [user, id])

	useEffect(() => {
		setPreviewImage(devCard.img)
	}, [devCard])

	useEffect(() => {
		if (error) {
			toast.error(error)
			navigate('/page-not-found')
		}
	}, [error, navigate])

	const addLink = () => {
		if (devCard.links.length > 2) {
			return
		}

		const newLink: ILink = {
			id: newLinkId,
			platform: Platforms.NONE,
			url: ''
		}

		setDevCard({ ...devCard, links: [...devCard.links, newLink] })
		setNewLinkId(prev => prev + 1)
	}

	const updateLink = (updatedLink: ILink) => {
		const updatedLinks = devCard.links.map(link =>
			link.id === updatedLink.id ? updatedLink : link
		)

		setDevCard({ ...devCard, links: updatedLinks })
	}

	const removeLink = (id: number) => {
		if (id < devCard.links.length) {
			setNewLinkId(prev => prev + 1)
		}

		const updatedLinks = devCard.links.filter(link => link.id !== id)
		setDevCard({ ...devCard, links: updatedLinks })
	}

	const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setDevCard(prev => ({
			...prev,
			[event.target.ariaLabel!.toString()]: event.target.value
		}))
	}

	const imgChangeHandler = (url: string) => {
		setPreviewImage(url)
		setDevCard(prev => ({ ...prev, img: url }))
	}

	const postCard = async () => {
		if (!(isObjectFilled(devCard, ['url', 'views', 'lastName']) && devCard.links.length > 0)) {
			return toast.warning('All fields are required')
		}

		try {
			setIsLoading(true)
			const imgFile = currentImage ? currentImage : await urlToFile(devCard.img, devCard.firstName)
			const newDevCard = new FormData()
			newDevCard.append(
				'card',
				new Blob(
					[
						JSON.stringify({
							email: devCard.email,
							firstName: devCard.firstName,
							lastName: devCard.lastName,
							title: devCard.title,
							links: devCard.links
						})
					],
					{ type: 'application/json' }
				)
			)
			newDevCard.append('img', imgFile)

			if (id === 'new') {
				await axios.post('/card/create', newDevCard)
				toast.success('Card posted successfully!')
			} else {
				await axios.put(`/card/update/${id}`, newDevCard)
				toast.success('Card updated successfully!')
			}

			dispatch(getUserCards())
			navigate('/dashboard')
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error.response?.data)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='py-10'>
			<div className='relative flex gap-10 mb-6 max-h-[75vh] overflow-y-scroll border-b border-b-black/10 pr-4'>
				<div className='sticky hidden md:block flex-[40%] top-0 left-0 w-[420px] h-[683px]'>
					<DevCardPreview
						firstName={devCard.firstName}
						lastName={devCard.lastName}
						img={devCard.img}
						email={devCard.email}
						links={devCard.links}
					/>
				</div>

				{isPreviewActive && (
					<div
						className='fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center py-5 bg-white'
						onClick={() => setIsPreviewActive(false)}>
						<DevCardPreview
							firstName={devCard.firstName}
							lastName={devCard.lastName}
							img={devCard.img}
							email={devCard.email}
							links={devCard.links}
						/>
						<span className='text-gray-400'>click anywhere to close</span>
					</div>
				)}

				<div className='flex-[60%] flex flex-col gap-6'>
					<div className='mb-2'>
						<h2 className='font-bold text-2xl mb-2'>Profile Details</h2>
						<p className='mb-4'>Add your details to create a personal touch to your profile</p>

						<ImageUpload
							className='mx-0'
							isLoading={isLoading}
							previewImage={previewImage}
							setCurrentImage={setCurrentImage}
							setPreviewImage={imgChangeHandler}
						/>

						<div className='mb-10'>
							<h5 className='mb-2'>Profile picture*</h5>
							<p className='text-black/60'>Use PNG, JPG format</p>
						</div>

						<div className='flex flex-col gap-5 w-full'>
							<Input
								disabled={isLoading}
								isLoading={isLoading}
								className='w-full'
								placeholder='Enter your first name here'
								label='First Name*'
								aria-label='firstName'
								value={devCard.firstName}
								onChange={inputChangeHandler}
								maxLength={16}
								required
							/>
							<Input
								disabled={isLoading}
								isLoading={isLoading}
								className='w-full'
								placeholder='Enter your last name here'
								label='Last Name'
								aria-label='lastName'
								value={devCard.lastName}
								onChange={inputChangeHandler}
								maxLength={16}
								required
							/>
							<Input
								disabled={isLoading}
								isLoading={isLoading}
								className='w-full'
								placeholder='Enter your email here'
								label='Email*'
								aria-label='email'
								value={devCard.email}
								onChange={inputChangeHandler}
								required
							/>
						</div>
					</div>
					{/* Profile details */}

					<div className='mb-8'>
						<h2 className='font-bold text-2xl mb-2'>Card Details</h2>
						<p className='mb-4'>Come up with a name for your devcard</p>

						<Input
							disabled={isLoading}
							isLoading={isLoading}
							label='Card title*'
							value={devCard.title}
							className='w-full'
							placeholder='Enter title here'
							onChange={inputChangeHandler}
							aria-label='title'
							required
						/>
					</div>

					<div className='mb-5'>
						<h2 className='font-bold text-2xl mb-2'>Customize your links</h2>
						<p className='mb-2'>
							Add/edit/remove links below and then share all your profiles with the world!
						</p>
						<button disabled={isLoading} className='btn btn_outline w-full' onClick={addLink}>
							+ Add new link
						</button>
					</div>

					<div className='flex flex-col gap-5 pb-10'>
						{devCard.links.map(link => (
							<LinkItem
								link={link}
								updateLink={updateLink}
								removeLink={() => removeLink(link.id)}
								key={link.id}
								isLoading={isLoading}
							/>
						))}
					</div>
				</div>
			</div>

			<button
				disabled={isLoading}
				className='btn btn_outline block md:hidden ml-auto w-full md:w-auto mb-2'
				onClick={() => setIsPreviewActive(true)}>
				{isLoading ? <Spinner /> : 'Preview'}
			</button>
			<button
				disabled={isLoading}
				className='btn block ml-auto w-full md:w-auto'
				onClick={postCard}>
				{isLoading ? <Spinner /> : 'Save'}
			</button>
		</div>
	)
}

export { Editor }

