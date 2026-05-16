import { FC } from 'react'

import { useFilterStore } from 'src/shared/store/filterStore'

const SelectedFilters: FC = () => {
	const { filters } = useFilterStore()

	if (filters.length === 0) {
		return null
	}

	return (
		<div className="mt-8 w-full max-w-2xl space-y-5">
			{filters.map(filter => (
				<div
					className="rounded-xl bg-white p-4 shadow-sm"
					key={filter.id}
				>
					<p className="font-semibold text-gray-900">{filter.id}</p>
					<div className="mt-2 flex flex-wrap gap-2">
						{filter.optionsIds.map(optionId => (
							<span
								className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
								key={optionId}
							>
								{optionId}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default SelectedFilters
