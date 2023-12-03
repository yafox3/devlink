import { ReactNode } from 'react'
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import { Platforms } from '../models'

export const platformToTSX = (platform: Platforms): ReactNode => {
	switch (platform) {
		case Platforms.GITHUB:
			return (
				<div className='flex items-center justify-between h-18 w-full bg-black/90 p-5 text-white rounded-xl hover:bg-black/80 transition-colors'>
					<div className='flex items-center gap-4'>
						<FaGithub className='text-lg'/>
						{Platforms.GITHUB}
					</div>
					<FaArrowRight className='text-lg'/>
				</div>
			)
		case Platforms.YOUTUBE:
			return (
				<div className='flex items-center justify-between h-18 w-full bg-red-700 p-5 text-white rounded-xl hover:bg-red-600 transition-colors'>
					<div className='flex items-center gap-4'>
						<FaYoutube className='text-lg'/>
						{Platforms.YOUTUBE}
					</div>
					<FaArrowRight className='text-lg'/>
				</div>
			)
		case Platforms.LINKEDIN:
			return (
				<div className='flex items-center justify-between h-18 w-full bg-blue-600 p-5 text-white rounded-xl hover:bg-blue-500 transition-colors'>
					<div className='flex items-center gap-4'>
						<FaLinkedin className='text-lg'/>
						{Platforms.LINKEDIN}
					</div>
					<FaArrowRight className='text-lg'/>
				</div>
			)
		default: return <div className='h-14 w-64 bg-black/10 rounded-2xl animate-pulse'></div>
	}
}