import { fireEvent, render, screen } from '@testing-library/react'

import FilterCheckbox from './FilterCheckbox'

const option = {
	id: 'breakfast',
	name: 'Breakfast included',
	description: 'The stay comes with breakfast.'
}

describe('FilterCheckbox', () => {
	it('renders the option name and description title', () => {
		render(
			<FilterCheckbox
				checked={true}
				data={option}
				onChange={vi.fn()}
			/>
		)

		expect(screen.getByText('Breakfast included')).toHaveAttribute(
			'title',
			'The stay comes with breakfast.'
		)
		expect(screen.getByRole('checkbox')).toBeChecked()
	})

	it('calls onChange when toggled', () => {
		const handleChange = vi.fn()

		render(
			<FilterCheckbox
				checked={false}
				data={option}
				onChange={handleChange}
			/>
		)

		fireEvent.click(screen.getByRole('checkbox'))

		expect(handleChange).toHaveBeenCalledTimes(1)
	})
})
