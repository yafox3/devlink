import { FC, useEffect, useState } from 'react'
import { Spinner } from '.'

const Loader: FC = () => {
	const [isLoadingMoreFiveSeconds, setIsLoadingMoreFiveSeconds] = useState(false) 

	useEffect(() => {
		setTimeout(() => {
			setIsLoadingMoreFiveSeconds(true)
		}, 5000)
	}, [isLoadingMoreFiveSeconds])

	return (
		<div className='fixed top-0 left-0 bottom-0 right-0 flex flex-col gap-6 items-center justify-center bg-black/5'>
			<Spinner className='h-16 w-16 dark:fill-blue-600 dark:text-white fill-blue-600 text-white' />
			<p className='text-center text-3xl'>Please wait...</p>
			{isLoadingMoreFiveSeconds && <p className='text-center text-base text-black/50'>if you see this loading more then 5 seconds, you will needed wait more 1-2 minute, because our server start so slow. <br /> I'm sorry 😔🙏</p>}
		</div>
	)
}

export {Loader}
