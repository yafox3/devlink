import { toast } from 'react-toastify'

interface ToastMessages {
	success: string
	error: string
}

export const toastByStatus = (responseType: string, messages: ToastMessages) => {
	const responseStatus = responseType.split('/').pop()

	switch(responseStatus) {
		case 'fulfilled': 
			toast.success(messages.success)
			break
		case 'rejected': 
			toast.error(messages.error)
			break
	}
}