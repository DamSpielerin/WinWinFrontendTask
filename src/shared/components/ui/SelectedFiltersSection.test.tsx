import { render, screen } from '@testing-library/react'
import { FilterType } from 'src/shared/api/types/Filter'
import 'src/shared/i18n'
import { useFilterStore } from 'src/shared/store/filterStore'

import SelectedFiltersSection from './SelectedFiltersSection'

describe('SelectedFiltersSection', () => {
	beforeEach(() => {
		useFilterStore.setState({
			draftFilters: [],
			filters: []
		})
	})

	it('renders nothing when no filters are selected', () => {
		const { container } = render(<SelectedFiltersSection />)

		expect(container).toBeEmptyDOMElement()
	})

	it('renders translated selected filter and option labels', () => {
		useFilterStore.setState({
			filters: [
				{
					id: 'FACILITIES',
					type: FilterType.OPTION,
					optionsIds: ['pool', 'parking']
				}
			]
		})

		render(<SelectedFiltersSection />)

		expect(screen.getByText('Facilities')).toBeVisible()
		expect(screen.getByText('Pool')).toBeVisible()
		expect(screen.getByText('Parking')).toBeVisible()
	})
})
