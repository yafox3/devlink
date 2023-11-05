import { FC, useState } from 'react'
import { DevCardList } from '../components'
import { IDevCard, Platforms } from '../models'

const Dashboard: FC = () => {
	const [devCards, setDevCards] = useState<IDevCard[]>([
		{
			id: 1,
			links: [
				{ link: 'https://example.com', platform: Platforms.GITHUB },
				{ link: 'https://example2.com', platform: Platforms.LINKEDIN }
			],
			img: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
			email: 'email1@example.com',
			firstName: 'John',
			lastName: 'Doe',
			viewsCount: 100
		},
		{
			id: 2,
			links: [
				{ link: 'https://example3.com', platform: Platforms.GITHUB },
				{ link: 'https://example4.com', platform: Platforms.YOUTUBE }
			],
			img: 'https://ui-avatars.com/api/?background=0D8ABC&color=e5f5f5',
			email: 'email2@example.com',
			firstName: 'Jane',
			lastName: 'Smith',
			viewsCount: 150
		}
	])

	return (
		<div className='py-10'>
			<h1 className='title mb-16'>Links</h1>
			<DevCardList devCards={devCards} />
			<button className='btn block mx-auto'>Create link</button>
		</div>
	)
}

export { Dashboard }

