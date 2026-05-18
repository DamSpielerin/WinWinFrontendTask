import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import 'src/shared/i18n'

import LanguageSwitcher from './LanguageSwitcher'

describe('LanguageSwitcher', () => {
	beforeEach(async () => {
		const { default: i18n } = await import('i18next')

		await i18n.changeLanguage('en')
	})

	it('renders English and Ukrainian language controls', () => {
		render(<LanguageSwitcher />)

		expect(screen.getByRole('navigation')).toHaveAccessibleName(
			'Language switcher'
		)
		expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
			'aria-current',
			'true'
		)
		expect(screen.getByRole('button', { name: 'UK' })).toBeVisible()
		expect(screen.getByText('|')).toBeVisible()
	})

	it('changes the active language', async () => {
		const { default: i18n } = await import('i18next')

		render(<LanguageSwitcher />)

		fireEvent.click(screen.getByRole('button', { name: 'UK' }))

		await waitFor(() => expect(i18n.language).toBe('uk'))
		expect(screen.getByRole('button', { name: 'UK' })).toHaveAttribute(
			'aria-current',
			'true'
		)
		expect(screen.getByRole('button', { name: 'EN' })).not.toHaveAttribute(
			'aria-current'
		)
	})
})
