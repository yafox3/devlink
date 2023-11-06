import { FC, useState } from 'react'
import { ImageUpload, Input } from '../components'

const Profile: FC = () => {
	const [currentImage, setCurrentImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string>('')

	return (
		<div className='py-10 max-w-[400px] flex flex-col justify-center items-center mx-auto'>
			<h1 className='title mb-8'>Profile</h1>

			<form action='submit'>
				<ImageUpload
					previewImage={previewImage}
					setCurrentImage={setCurrentImage}
					setPreviewImage={setPreviewImage}
				/>

				<div className='mx-auto text-center mb-10'>
					<h5 className='mb-2'>Profile picture</h5>
					<p className='text-black/60'>
						Image must be below 1024x1024px. <br />
						Use PNG, JPG format
					</p>
				</div>

				<div className='flex flex-col gap-5 w-full mb-16'>
					<Input
						className='min-w-[400px]'
						placeholder='Enter your first name here'
						label='First Name'
					/>
					<Input className='w-full' placeholder='Enter your last name here' label='Last Name' />
				</div>

				<button className='btn block mx-auto'>Save changes</button>
			</form>
		</div>
	)
}

export { Profile }

