import { FC } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

interface BurgerProps {
	isOpen: boolean
	toggle: () => void
}

const Burger: FC<BurgerProps> = ({ isOpen, toggle }) => {
	return <div onClick={toggle} className={'block z-50 md:hidden cursor-pointer text-2xl'.concat(' ', isOpen ? 'text-white fixed right-8 top-6' : 'text-blue-950')}>{isOpen ? <FaTimes /> : <FaBars />}</div>
}

export { Burger }

