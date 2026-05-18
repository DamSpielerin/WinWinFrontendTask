import { FC } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'

interface ConfirmationModalProps {
	isOpen: boolean
	onApply: () => void
	onClose: () => void
	onUseOldFilter: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = props => {
	const { isOpen, onApply, onClose, onUseOldFilter } = props
	const { t } = useTranslation('filter')

	return createPortal(
		<div
			aria-hidden={!isOpen}
			className={`fixed inset-0 z-[60] items-center justify-center bg-black/30 px-4 backdrop-blur-md ${
				isOpen ? 'flex' : 'hidden'
			}`}
			onClick={onClose}
		>
			<div
				aria-labelledby="confirmation-modal-title"
				aria-modal="true"
				className="w-full max-w-6xl rounded-2xl bg-white p-6 shadow-xl space-y-6"
				role="dialog"
				onClick={event => event.stopPropagation()}
			>
				<button
					aria-label="Close confirmation modal"
					className="rounded-full float-end px-3 py-2 text-4xl leading-none text-gray-800 hover:text-gray-900"
					type="button"
					onClick={onClose}
				>
					&times;
				</button>

				<h2
					className="font-medium text-4xl text-gray-900 text-center tracking-wide pl-10 mt-2"
					id="confirmation-modal-title"
				>
					{t('applyNewFilterConfirmation')}
				</h2>

				<div className="mt-24 flex justify-center gap-4">
					<Button
						size="large"
						title={t('useOldFilter')}
						type="button"
						variant="secondary"
						onClick={onUseOldFilter}
					/>
					<Button
						size="large"
						title={t('applyNewFilter')}
						type="button"
						variant="primary"
						onClick={onApply}
					/>
				</div>
			</div>
		</div>,
		document.body
	)
}

export default ConfirmationModal
