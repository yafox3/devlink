import { toast } from 'react-toastify'

export const copyToClipboard = async (value: string) => {
	if (!navigator?.clipboard) {
		toast.error('Clipboard not supported 😔')
		return
	}

	try {
		await navigator.clipboard.writeText(value)
		toast.success('Value was successfully written to clipboard!')
	} catch {
		toast.error('Something went wrong!')
	}
}