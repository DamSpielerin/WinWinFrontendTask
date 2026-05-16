import { ComponentProps, FC } from 'react'

type ButtonType = 'primary' | 'secondary' | 'link'

type ButtonSize = 'small' | 'large'

type ButtonProps = {
	title: string
	variant: ButtonType
	size?: ButtonSize
	className?: string
} & ComponentProps<'button'>

const Button: FC<ButtonProps> = props => {
	const { title, variant, size, className, ...rest } = props

	const types = {
		primary:
			'rounded-2xl bg-[#FF5F00] text-white hover:bg-[#FF9E59] active:bg-[#FF3D00]',
		secondary:
			'rounded-2xl bg-white text-gray-800 hover:text-gray-700 border-2 border-[#B4B4B4] hover:bg-[#F4F4F4] active:bg-white active:text-[#FF3D00] active:border-[#FF3D00]',
		link: 'text-[#078691] hover:text-gray-500 underline'
	}

	const sizes = {
		small: 'px-18 py-5',
		large: 'px-10 py-5 sm:px-24'
	}
	return (
		<button
			className={`${types[variant]} ${size ? sizes[size] : ''} ${className} text-middle hover:ease-in-out cursor-pointer`}
			{...rest}
		>
			{title}
		</button>
	)
}

export default Button
