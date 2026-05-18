import { fireEvent, render, screen } from '@testing-library/react'
import 'src/shared/i18n'

import ConfirmationModal from './ConfirmationModal'

describe('ConfirmationModal', () => {
	it('renders translated content when open', () => {
		render(
			<ConfirmationModal
				isOpen={true}
				onApply={vi.fn()}
				onClose={vi.fn()}
				onUseOldFilter={vi.fn()}
			/>
		)

		expect(screen.getByRole('dialog')).toBeVisible()
		expect(
			screen.getByRole('heading', {
				name: 'Do you want to apply new filter?'
			})
		).toBeVisible()
		expect(screen.getByRole('button', { name: 'Use old filter' })).toBeVisible()
		expect(
			screen.getByRole('button', { name: 'Apply new filter' })
		).toBeVisible()
	})

	it('calls the matching callbacks for modal actions', () => {
		const handleApply = vi.fn()
		const handleClose = vi.fn()
		const handleUseOldFilter = vi.fn()

		render(
			<ConfirmationModal
				isOpen={true}
				onApply={handleApply}
				onClose={handleClose}
				onUseOldFilter={handleUseOldFilter}
			/>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Apply new filter' }))
		fireEvent.click(screen.getByRole('button', { name: 'Use old filter' }))
		fireEvent.click(
			screen.getByRole('button', { name: 'Close confirmation modal' })
		)

		expect(handleApply).toHaveBeenCalledTimes(1)
		expect(handleUseOldFilter).toHaveBeenCalledTimes(1)
		expect(handleClose).toHaveBeenCalledTimes(1)
	})

	it('closes when the backdrop is clicked', () => {
		const handleClose = vi.fn()

		render(
			<ConfirmationModal
				isOpen={true}
				onApply={vi.fn()}
				onClose={handleClose}
				onUseOldFilter={vi.fn()}
			/>
		)

		fireEvent.click(screen.getByRole('dialog').parentElement!)

		expect(handleClose).toHaveBeenCalledTimes(1)
	})
})
