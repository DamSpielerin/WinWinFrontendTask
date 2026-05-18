import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '../../../shared/components/langs/LanguageSwitcher'
import FilterModal from '../../../shared/components/modals/FilterModal'
import Button from '../../../shared/components/ui/Button'
import SelectedFiltersSection from '../../../shared/components/ui/SelectedFiltersSection'

const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

	return (
		<section className="relative flex h-dvh w-full flex-col items-center justify-center px-4 bg-gradient-to-br bg-amber-50">
			<LanguageSwitcher />
			<h1 className="text-6xl text-center font-semibold text-gray-600 mb-12">
				{t('title')}
			</h1>
			<Button
				size="large"
				title={t('changeFilter')}
				variant="primary"
				onClick={() => setIsFilterModalOpen(true)}
			/>
			<FilterModal
				isOpen={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
			/>
			<SelectedFiltersSection />
		</section>
	)
}
export default App
