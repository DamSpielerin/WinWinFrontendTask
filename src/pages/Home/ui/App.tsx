import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../../shared/ui/Button'
import FilterModal from '../../../shared/ui/FilterModal'
import SelectedFilters from '../../../shared/ui/SelectedFilters'

const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

	return (
		<section className="flex h-dvh w-full flex-col items-center justify-center px-4 bg-gradient-to-br bg-amber-50">
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
			<SelectedFilters />
		</section>
	)
}
export default App
