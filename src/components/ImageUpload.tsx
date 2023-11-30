import { FC, HTMLAttributes } from 'react'
import { FaRegImage } from 'react-icons/fa6'

interface ImageUploadProps extends HTMLAttributes<HTMLLabelElement> {
	previewImage: string
	isLoading?: boolean
	setCurrentImage: (file: File) => void
	setPreviewImage: (url: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ previewImage, setCurrentImage, setPreviewImage, isLoading, className = ''}) => {
	const selectImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files as FileList
		setCurrentImage(selectedFiles?.[0])
		setPreviewImage(URL.createObjectURL(selectedFiles?.[0]))
	}
	
	return (
		<label className={'relative group block cursor-pointer mb-4 h-[200px] w-[200px]'.concat(' ', className)}>
			<img
				className={'mx-auto block h-[200px] w-[200px] rounded-full object-cover'.concat(' ', isLoading ? 'bg-black/10 animate-pulse' : '')}
				src={isLoading ? '' : previewImage}
			/>
			<div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center rounded-full transition duration-300 bg-black/75 opacity-0 group-hover:opacity-100'>
				<FaRegImage className='text-4xl text-white mb-5' />
				<p className='text-white'>Upload Image</p>
			</div>
			<input disabled={isLoading} className='hidden' accept='image/jpeg, image/png' type='file' onChange={selectImageHandler} />
		</label>
	)
}

export { ImageUpload }

