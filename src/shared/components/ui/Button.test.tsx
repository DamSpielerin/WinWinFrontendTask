import { fireEvent, render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
	it('renders the title and forwards native button props', () => {
		const handleClick = vi.fn()

		render(
			<Button
				aria-label="submit filters"
				size="small"
				title="Apply"
				type="button"
				variant="primary"
				onClick={handleClick}
			/>
		)

		const button = screen.getByRole('button', { name: 'submit filters' })

		expect(button).toHaveTextContent('Apply')
		expect(button).toHaveAttribute('type', 'button')

		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('applies classes for the selected variant and size', () => {
		render(
			<Button
				className="custom-button"
				size="large"
				title="Clear"
				variant="secondary"
			/>
		)

		expect(screen.getByRole('button', { name: 'Clear' })).toHaveClass(
			'bg-white',
			'px-10',
			'sm:px-24',
			'custom-button'
		)
	})
})
