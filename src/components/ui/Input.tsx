import { FC } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

const Input: FC<InputProps> = ({ className = '', label, ...props }) => {
	return (
		<>
			<label className='block text-base w-full'>
				{label}
				<input className={'input'.concat(' ', className)} {...props} />
			</label>
		</>
	)
}

export { Input }

