import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import { FilterChoose } from 'src/shared/api/types/Filter'
import { useFilterStore } from 'src/shared/store/filterStore'
import filterData from 'src/shared/temp/filterData.json'

import Button from '../ui/Button'
import FilterSection from '../ui/FilterSection'
import ConfirmationModal from './ConfirmationModal'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

interface FiltersResponse {
	filterItems: FilterChoose[]
}

const getFilters = async (): Promise<FiltersResponse> =>
	filterData as FiltersResponse

const FilterModal: FC<FilterModalProps> = props => {
	const { isOpen, onClose } = props
	const { t } = useTranslation('filter')
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
	const {
		applyDraftFilters,
		draftFilters,
		resetDraftFilters,
		setDraftFilters,
		toggleDraftFilterOption
	} = useFilterStore()
	const { data } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters,
		enabled: isOpen
	})

	useEffect(() => {
		if (isOpen) {
			resetDraftFilters()
			setIsConfirmationModalOpen(false)
		}
	}, [isOpen, resetDraftFilters])

	const getCheckedOptionsIds = (filterId: string) =>
		draftFilters.find(filter => filter.id === filterId)?.optionsIds ?? []

	const handleCancel = () => {
		resetDraftFilters()
		setIsConfirmationModalOpen(false)
		onClose()
	}

	const handleApply = () => {
		applyDraftFilters()
		setIsConfirmationModalOpen(false)
		onClose()
	}

	return createPortal(
		<div
			aria-hidden={!isOpen}
			className={`fixed inset-0 z-50 items-start justify-center overflow-y-auto height-100% bg-black/30 px-10 py-12  backdrop-blur-md ${
				isOpen ? 'flex' : 'hidden'
			}`}
			onClick={handleCancel}
		>
			<div
				aria-labelledby="filter-modal-title"
				aria-modal="true"
				className="w-full max-w-6xl rounded-2xl bg-white p-6 shadow-xl space-y-6"
				role="dialog"
				onClick={event => event.stopPropagation()}
			>
				<button
					aria-label="Close modal"
					className="rounded-full float-end px-3 py-2 text-4xl leading-none text-gray-800 hover:text-gray-900"
					type="button"
					onClick={handleCancel}
				>
					&times;
				</button>
				<h2
					className="font-medium text-4xl text-gray-900 text-center tracking-wide pl-4 mt-3"
					id="filter-modal-title"
				>
					{t('filter')}
				</h2>
				<hr className="mt-8 border-gray-400 border-1" />

				<div className="mt-8 space-y-5">
					{data?.filterItems.map(filter => (
						<FilterSection
							checkedOptionsIds={getCheckedOptionsIds(filter.id)}
							data={filter}
							key={filter.id}
							onOptionChange={toggleDraftFilterOption}
						/>
					))}
				</div>

				<div className="relative mt-6 flex items-center justify-center">
					<Button
						size="small"
						title={t('apply')}
						type="button"
						variant="primary"
						onClick={() => setIsConfirmationModalOpen(true)}
					/>

					<Button
						className="absolute right-0"
						title={t('clearAllParameters')}
						variant="link"
						onClick={() => setDraftFilters([])}
					/>
				</div>

				<ConfirmationModal
					isOpen={isConfirmationModalOpen}
					onApply={handleApply}
					onClose={() => setIsConfirmationModalOpen(false)}
					onUseOldFilter={handleCancel}
				/>
			</div>
		</div>,
		document.body
	)
}

export default FilterModal
