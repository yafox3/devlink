import { FC } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	isLoading?: boolean
}

const Input: FC<InputProps> = ({ className = '', label, isLoading, ...props }) => {
	return (
		<>
			<label className='block text-base w-full'>
				{label}
				<input disabled={isLoading} className={'input'.concat(' ', className, ' ', isLoading ? 'bg-black/10 animate-pulse' : '')} {...props} />
			</label>
		</>
	)
}

export { Input }

