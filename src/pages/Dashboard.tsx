import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DevCardList } from '../components'
import { IDevCard, Platforms } from '../models'

const Dashboard: FC = () => {
	const [devCards, setDevCards] = useState<IDevCard[]>([
		{
			url: 'qwezcc123',
			links: [
				{ id: 1, link: 'https://example.com', platform: Platforms.GITHUB },
				{ id: 2, link: 'https://example2.com', platform: Platforms.LINKEDIN }
			],
			img: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
			email: 'email1@example.com',
			firstName: 'John',
			lastName: 'Doe',
			viewsCount: 100
		},
		{
			url: 'qwezcccvv',
			links: [
				{ id: 1, link: 'https://example3.com', platform: Platforms.GITHUB },
				{ id: 2, link: 'https://example4.com', platform: Platforms.YOUTUBE }
			],
			img: 'https://ui-avatars.com/api/?background=0D8ABC&color=e5f5f5',
			email: 'email2@example.com',
			firstName: 'Jane',
			lastName: 'Smith',
			viewsCount: 150
		}
	])
	const navigate = useNavigate()

	const createLinkHandler = () => {
		navigate(`/editor/new`)
	}

	return (
		<div className='py-10'>
			<h1 className='title mb-16'>Links</h1>
			<DevCardList devCards={devCards} />
			<button 
				className='btn block mx-auto'
				onClick={createLinkHandler}
			>
				Create link
			</button>
		</div>
	)
}

export { Dashboard }

