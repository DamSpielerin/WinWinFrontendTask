import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'

const languages = [
	{
		code: 'en',
		label: 'EN'
	},
	{
		code: 'uk',
		label: 'UK'
	}
] as const

const LanguageSwitcher: FC = () => {
	const { i18n } = useTranslation()

	const currentLanguage = i18n.resolvedLanguage ?? i18n.language

	return (
		<nav
			aria-label="Language switcher"
			className="absolute right-6 top-6 flex items-center gap-2 text-lg font-medium"
		>
			{languages.map((language, index) => {
				const isActive = currentLanguage === language.code

				return (
					<span
						className="flex items-center gap-2"
						key={language.code}
					>
						<Button
							aria-current={isActive ? 'true' : undefined}
							className={`p-0 text-lg font-medium underline-offset-4 ${
								isActive ? 'text-[#FF5F00]' : 'text-gray-700'
							}`}
							title={language.label}
							type="button"
							variant="link"
							onClick={() => i18n.changeLanguage(language.code)}
						/>
						{index < languages.length - 1 ? (
							<span className="text-gray-500">|</span>
						) : null}
					</span>
				)
			})}
		</nav>
	)
}

export default LanguageSwitcher
