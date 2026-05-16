import { FC } from 'react'

import { FilterChooseOption } from 'src/shared/api/types/Filter'

interface FilterCheckboxProps {
	checked: boolean
	data: FilterChooseOption
	onChange: () => void
}

const FilterCheckbox: FC<FilterCheckboxProps> = props => {
	const { checked, data, onChange } = props

	return (
		<label className="flex cursor-pointer items-start gap-3">
			<input
				checked={checked}
				className="mt-0.5 size-5 accent-gray-700 text-white cursor-pointer"
				type="checkbox"
				onChange={onChange}
			/>
			<span>
				<span
					className="font-display block font-small hover:animate-out text-gray-600 hover:text-gray-800"
					title={data.description}
				>
					{data.name}
				</span>
			</span>
		</label>
	)
}

export default FilterCheckbox
