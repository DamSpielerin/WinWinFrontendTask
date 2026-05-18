import { fireEvent, render, screen } from '@testing-library/react'
import { FilterChoose, FilterType } from 'src/shared/api/types/Filter'
import 'src/shared/i18n'

import FilterSection from './FilterSection'

const filter: FilterChoose = {
	id: 'MEAL_OPTIONS',
	name: 'Meal options',
	type: FilterType.OPTION,
	options: [
		{
			id: 'breakfast',
			name: 'Breakfast included',
			description: 'Morning meal.'
		},
		{
			id: 'dinner',
			name: 'Dinner included',
			description: 'Evening meal.'
		}
	]
}

describe('FilterSection', () => {
	it('renders all options and marks checked options', () => {
		render(
			<FilterSection
				checkedOptionsIds={['dinner']}
				data={filter}
				onOptionChange={vi.fn()}
			/>
		)

		expect(screen.getByRole('heading', { name: 'Meal options' })).toBeVisible()
		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).not.toBeChecked()
		expect(
			screen.getByRole('checkbox', { name: 'Dinner included' })
		).toBeChecked()
	})

	it('passes filter and option ids when an option changes', () => {
		const handleOptionChange = vi.fn()

		render(
			<FilterSection
				checkedOptionsIds={[]}
				data={filter}
				onOptionChange={handleOptionChange}
			/>
		)

		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)

		expect(handleOptionChange).toHaveBeenCalledWith('MEAL_OPTIONS', 'breakfast')
	})
})
