import { FC, PropsWithChildren } from 'react'

interface ModalProps extends PropsWithChildren {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
	return (
		<div
			className={'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 transition-all duration-300 '.concat(
				isOpen ? 'visible opacity-100' : 'invisible opacity-0'
			)}
			onClick={() => setIsOpen(false)}>
			<div
				className={'w-full max-w-md max-h-full py-5 px-10 bg-white rounded-xl transition duration-700 '.concat(
					isOpen ? 'translate-y-0' : '-translate-y-[100vh]'
				)}
				onClick={(event: React.MouseEvent) => event.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export { Modal }
