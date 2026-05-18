import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FilterType } from 'src/shared/api/types/Filter'
import 'src/shared/i18n'
import { useFilterStore } from 'src/shared/store/filterStore'

import FilterModal from './FilterModal'

const renderWithClient = (children: ReactNode) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	})

	return render(
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

describe('FilterModal', () => {
	beforeEach(() => {
		useFilterStore.setState({
			draftFilters: [],
			filters: []
		})
	})

	it('loads filter options when open', async () => {
		renderWithClient(
			<FilterModal
				isOpen={true}
				onClose={vi.fn()}
			/>
		)

		expect(screen.getByRole('dialog', { name: 'Filter' })).toBeVisible()
		expect(await screen.findByText('Meal options')).toBeVisible()
		expect(screen.getByRole('checkbox', { name: 'Breakfast included' })).toBe(
			await screen.findByRole('checkbox', { name: 'Breakfast included' })
		)
	})

	it('clears draft filters without closing the modal', async () => {
		const handleClose = vi.fn()

		useFilterStore.setState({
			draftFilters: [
				{
					id: 'MEAL_OPTIONS',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			]
		})

		renderWithClient(
			<FilterModal
				isOpen={true}
				onClose={handleClose}
			/>
		)

		await screen.findByRole('checkbox', { name: 'Breakfast included' })

		fireEvent.click(
			screen.getByRole('button', { name: 'Clear all parameters' })
		)

		expect(useFilterStore.getState().draftFilters).toEqual([])
		expect(handleClose).not.toHaveBeenCalled()
	})

	it('applies selected draft filters after confirmation', async () => {
		const handleClose = vi.fn()

		renderWithClient(
			<FilterModal
				isOpen={true}
				onClose={handleClose}
			/>
		)

		fireEvent.click(
			await screen.findByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		fireEvent.click(screen.getByRole('button', { name: 'Apply new filter' }))

		await waitFor(() =>
			expect(useFilterStore.getState().filters).toEqual([
				{
					id: 'MEAL_OPTIONS',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			])
		)
		expect(handleClose).toHaveBeenCalledTimes(1)
	})

	it('restores current filters and closes when cancelled', async () => {
		const handleClose = vi.fn()

		useFilterStore.setState({
			draftFilters: [
				{
					id: 'FACILITIES',
					type: FilterType.OPTION,
					optionsIds: ['pool']
				}
			],
			filters: [
				{
					id: 'MEAL_OPTIONS',
					type: FilterType.OPTION,
					optionsIds: ['dinner']
				}
			]
		})

		renderWithClient(
			<FilterModal
				isOpen={true}
				onClose={handleClose}
			/>
		)

		fireEvent.click(await screen.findByRole('button', { name: 'Close modal' }))

		expect(useFilterStore.getState().draftFilters).toEqual([
			{
				id: 'MEAL_OPTIONS',
				type: FilterType.OPTION,
				optionsIds: ['dinner']
			}
		])
		expect(handleClose).toHaveBeenCalledTimes(1)
	})
})
