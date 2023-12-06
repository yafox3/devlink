import { ChangeEvent, FC, useEffect, useState } from 'react'
import { ImageUpload, Input, Spinner } from '../components'
import { toastByStatus } from '../helpers'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Statuses } from '../models'
import { getUser, updateProfile } from '../store/slices/userSlice'

const Profile: FC = () => {
	const { user: {img, firstName, lastName}, status } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const isLoading = status === Statuses.LOADING
	const [currentImage, setCurrentImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string>('')
	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: ''
	})

	useEffect(() => {
		!!img || dispatch(getUser())
	}, [])

	useEffect(() => {
		setPreviewImage(img)
		setProfileData({firstName: firstName ?? '', lastName: lastName ?? ''})
	}, [img, firstName, lastName])
	
	const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData()
		formData.append('file', currentImage as File)
		formData.append('firstName', profileData.firstName)
		formData.append('lastName', profileData.lastName)

		const response = await dispatch(updateProfile(formData))

		toastByStatus(response.type, {
			success: 'Profile updated successfully!',
			error: 'Something went wrong!'
		})
	}

	return (
		<div className='py-10 max-w-[400px] flex flex-col justify-center items-center mx-auto'>
			<h1 className='title mb-8'>Profile</h1>

			<form action='submit' className='w-full' onSubmit={handleProfileUpdate}>
				<ImageUpload
					className='mx-auto'
					isLoading={isLoading}
					previewImage={previewImage}
					setCurrentImage={setCurrentImage}
					setPreviewImage={setPreviewImage}
				/>

				<div className='mx-auto text-center mb-10'>
					<h5 className='mb-2'>Profile picture</h5>
					<p className='text-black/60'>Use PNG, JPG format</p>
				</div>

				<div className='flex flex-col gap-5 w-full mb-16'>
					<Input
						className='w-full'
						placeholder='Enter your first name here'
						label='First Name'
						isLoading={isLoading}
						value={profileData.firstName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setProfileData({ ...profileData, firstName: e.target.value })
						}
					/>
					<Input
						className='w-full'
						placeholder='Enter your last name here'
						label='Last Name'
						isLoading={isLoading}
						value={profileData.lastName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setProfileData({ ...profileData, lastName: e.target.value })
						}
					/>
				</div>

				<button disabled={isLoading} className='btn block mx-auto'>{isLoading ? <Spinner /> : 'Save changes'}</button>
			</form>
		</div>
	)
}

export { Profile }

