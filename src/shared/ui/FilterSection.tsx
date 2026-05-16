import { FC } from 'react'

import { FilterChoose } from 'src/shared/api/types/Filter'

import FilterCheckbox from './FilterCheckbox'

interface FilterSectionProps {
	checkedOptionsIds: string[]
	data: FilterChoose
	onOptionChange: (filterId: string, optionId: string) => void
}

const FilterSection: FC<FilterSectionProps> = props => {
	const { checkedOptionsIds, data, onOptionChange } = props

	return (
		<section>
			<h3 className="font-medium mb-6 mt-12 text-2xl text-gray-700">
				{data.name}
			</h3>

			<div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
				{data.options.map(option => (
					<FilterCheckbox
						checked={checkedOptionsIds.includes(option.id)}
						data={option}
						key={option.id}
						onChange={() => onOptionChange(data.id, option.id)}
					/>
				))}
			</div>

			<hr className="mt-10 mb-6 border-gray-400 border-1" />
		</section>
	)
}

export default FilterSection
