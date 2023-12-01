import { FC } from 'react'
import { FaGithub, FaLink, FaLinkedin, FaRegTrashCan, FaYoutube } from 'react-icons/fa6'
import { GroupBase, StylesConfig } from 'react-select'
import { Input, Spinner } from '.'
import { ILink, Platforms } from '../models'
import { CustomSelect, Option } from './ui/CustomSelect'

const selectStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
	singleValue: baseStyles => ({
		...baseStyles,
		display: 'flex',
		alignItems: 'center',
		gap: 5
	}),
	control: baseStyles => ({
		...baseStyles,
		padding: '8px 0 8px 5px',
		borderRadius: 10
	}),
	option: baseStyles => ({
		...baseStyles,
		display: 'flex',
		alignItems: 'center',
		gap: 5,
		padding: 10
	}),
	menuList: baseStyles => ({
		...baseStyles
	}),
	menu: baseStyles => ({
		...baseStyles,
		overflow: 'hidden',
		borderRadius: 10
	})
}

const options: Option[] = [
	{
		label: 'YouTube',
		icon: <FaYoutube className='text-red-700 text-xl' />,
		value: Platforms.YOUTUBE
	},
	{
		label: 'GitHub',
		icon: <FaGithub className='text-xl' />,
		value: Platforms.GITHUB
	},
	{
		label: 'LinkedIn',
		icon: <FaLinkedin className='text-blue-700 text-xl' />,
		value: Platforms.LINKEDIN
	}
]

interface LinkItemProps {
	link: ILink
	updateLink: (link: ILink) => void
	removeLink: () => void
	isLoading?: boolean
}

const LinkItem: FC<LinkItemProps> = ({ link, removeLink, updateLink, isLoading }) => {
	const handlePlatformChange = (platform: Option | null) => {
		updateLink({ ...link, platform: platform!.value })
	}

	const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateLink({ ...link, url: e.target.value })
	}

	return (
		<div className='relative pt-3.5 px-4 rounded-xl bg-gray-100'>
			<div className='flex items-center justify-between mb-5'>
				<div className='flex items-center gap-1.5 text-gray-600'>
					<FaLink />
					<span className='font-bold'>Link #{link.id}</span>
				</div>
				<FaRegTrashCan onClick={removeLink} className='text-lg text-red-600 cursor-pointer' />
			</div>

			<div className='flex flex-col gap-5'>
				<CustomSelect
					options={options}
					value={options.find(option => option.value === link.platform) ?? null}
					onChange={handlePlatformChange}
					styles={selectStyles}
					label='Platform'
				/>

				<div className='relative'>
					<FaLink className='absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600' />
					<Input
						label='Link'
						placeholder='Enter your link here'
						className='w-full mb-8 pl-10'
						value={link.url}
						onChange={handleLinkChange}
					/>
				</div>
			</div>

			{isLoading && (
				<div className='absolute top-0 left-0 bottom-0 right-0 z-10 animate-pulse bg-black/10 rounded-xl flex items-center justify-center'>
					<Spinner />
				</div>
			)}
		</div>
	)
}

export { LinkItem }
