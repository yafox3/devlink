import React from 'react'
import Select, {
	GroupBase,
	OptionProps,
	SingleValueProps,
	StylesConfig,
	components
} from 'react-select'
import { Platforms } from '../../models'

export interface Option {
	label: string
	icon: React.ReactNode
	value: Platforms
}

interface CustomSelectProps {
	options: Option[]
	value: Option | null
	onChange: (selectedOption: Option | null) => void
	styles?: StylesConfig<Option, boolean, GroupBase<Option>> | undefined
	label?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, styles, label }) => {
	const handleChange = (selectedOption: Option | null) => {
		onChange(selectedOption)
	}

	const SingleValue: React.FC<SingleValueProps<Option>> = ({ children, ...props }) => (
		<components.SingleValue {...props}>
			{value ? value.icon : null} {children}
		</components.SingleValue>
	)

	const OptionComponent: React.FC<OptionProps<Option>> = props => (
		<components.Option {...props}>
			{props.data.icon} {props.label}
		</components.Option>
	)

	return (
		<label>
			<span className='block text-base mb-2'>{label}</span>
			<Select
				options={options}
				isSearchable={false}
				value={value}
				onChange={handleChange}
				styles={styles}
				components={{ Option: OptionComponent, SingleValue }}
			/>
		</label>
	)
}

export { CustomSelect }

