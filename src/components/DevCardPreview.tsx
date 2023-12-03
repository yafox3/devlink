import { FC } from 'react'
import { platformToTSX } from '../helpers'
import { ILink } from '../models'

interface DevCardPreviewProps {
	email: string
	firstName: string
	lastName: string
	img: string
	links: ILink[]
}

const DevCardPreview: FC<DevCardPreviewProps> = ({email, firstName, img, lastName, links}) => {
	return (
		<div className='relative select-none z-10 w-[344px] h-[683px] border-[16px] border-gray-900 rounded-[55px] shadow-xl overflow-hidden'>
			<div className='absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-2xl'></div>

			<div className='mt-10'>
				{img 
					? <img className='mb-4 w-28 h-28 object-cover mx-auto rounded-full' src={img} alt='devlink avatar' />
					: <div className='mb-4 w-28 h-28 mx-auto rounded-full bg-black/10 animate-pulse'></div>
				}

				{firstName || lastName 
					? <p className='text-center font-bold text-lg mb-2'><span>{firstName}</span> <span>{lastName}</span></p>
					: <div className='h-3 bg-black/10 rounded-full w-48 mb-4 mx-auto animate-pulse'></div>
				}

				{email 
					? <p className='text-center text-black/75 mb-14'>{email}</p>
					: <div className='h-2.5 bg-black/10 rounded-full w-24 mb-14 mx-auto animate-pulse'></div>
				}

				<div className='flex flex-col items-center gap-6'>
					{links.map(link => (
						<div key={link.id}>
							{platformToTSX(link.platform)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export { DevCardPreview }

