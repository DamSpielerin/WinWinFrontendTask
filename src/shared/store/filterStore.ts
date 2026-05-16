import { create } from 'zustand'

import { FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	draftFilters: SearchRequestFilter
	filters: SearchRequestFilter
	applyDraftFilters: () => void
	resetDraftFilters: () => void
	setDraftFilters: (filters: SearchRequestFilter) => void
	setFilters: (filters: SearchRequestFilter) => void
	toggleDraftFilterOption: (filterId: string, optionId: string) => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
	draftFilters: [],
	filters: [],
	applyDraftFilters: () => set(state => ({ filters: state.draftFilters })),
	resetDraftFilters: () => set(state => ({ draftFilters: state.filters })),
	setDraftFilters: draftFilters => set({ draftFilters }),
	setFilters: filters => set({ filters }),
	toggleDraftFilterOption: (filterId, optionId) =>
		set(() => {
			const currentFilters = get().draftFilters
			const currentFilter = currentFilters.find(
				filter => filter.id === filterId
			)

			if (!currentFilter) {
				return {
					draftFilters: [
						...currentFilters,
						{
							id: filterId,
							type: FilterType.OPTION,
							optionsIds: [optionId]
						}
					]
				}
			}

			const isSelected = currentFilter.optionsIds.includes(optionId)
			const optionsIds = isSelected
				? currentFilter.optionsIds.filter(id => id !== optionId)
				: [...currentFilter.optionsIds, optionId]

			if (optionsIds.length === 0) {
				return {
					draftFilters: currentFilters.filter(filter => filter.id !== filterId)
				}
			}

			return {
				draftFilters: currentFilters.map(filter =>
					filter.id === filterId ? { ...filter, optionsIds } : filter
				)
			}
		})
}))
